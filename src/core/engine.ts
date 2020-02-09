import { GLUtilities, gl } from './gl/gl';
import { Shader } from './gl/shader';
import { GLBuffer, AttributeInfo } from './gl/glBuffer';
import { Sprite } from './graphics/sprite';
import { Matrix4x4 } from './math/matrix4x4';

export namespace TSE {
    export class Engine {

        private _canvas: HTMLCanvasElement;
        private _shader: Shader;
        private _projection : Matrix4x4;

        private _sprite : Sprite

        public constructor() {
        }

        public start(): void {
            this._canvas = GLUtilities.initialize();
            gl.clearColor(0, 0, 0, 1);
            this.loadShaders();
            this._shader.use();
            // Load
            this._projection = Matrix4x4.orthografic(0,this._canvas.width,0,this._canvas.height,-100.0,100.0);

            this._sprite = new Sprite("test");
            this._sprite.load();
            this._sprite.position.x = 200;

            this.resize();
            this.loop();
        }

        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Set uniforms
            const colorPosition = this._shader.getUniformLocation('u_color');
            gl.uniform4f(
                colorPosition,
                1,
                0.5,
                0,1);

                let projectionPosition = this._shader.getUniformLocation("u_projection");
                gl.uniformMatrix4fv(projectionPosition,false, new Float32Array(this._projection.data));

                let modelLocation = this._shader.getUniformLocation("u_model");
                gl.uniformMatrix4fv(modelLocation,false, new Float32Array(Matrix4x4.translation(this._sprite.position).data));


            this._sprite.draw();

            requestAnimationFrame(this.loop.bind(this));
        }

        public resize(): void {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
                // gl.viewport(0, 0, this._canvas.width, this._canvas.height);
                //porque mudar fica menor ?
                gl.viewport(-1, 1, 1, -1);
            }
        }


        private loadShaders(): void {
            let vertexShaderSource =
                `
            attribute vec3 a_position;           
            
            uniform mat4 u_projection;

            //Representa posicao,rotacao e scale
            uniform mat4 u_model;
            
            void main(){
                // gl_Position é uma variável global do WebGL 
                gl_Position = u_projection * u_model * vec4(a_position,1.0);
            }
            `;
            let fragmentShaderSource =
                `
            precision mediump float;
            uniform vec4 u_color;

            void main(){
                // assim como gl_Position , gl_FragColor é uma variável global do WebGL
                gl_FragColor = u_color;
            }
            `;

            this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);

        }
    }
}