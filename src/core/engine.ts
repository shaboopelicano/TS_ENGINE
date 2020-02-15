import { GLUtilities, gl } from './gl/gl';
import { Shader } from './gl/shader';
import { GLBuffer, AttributeInfo } from './gl/glBuffer';
import { Sprite } from './graphics/sprite';
import { Matrix4x4 } from './math/matrix4x4';
import AssetManager from './assets/assetManager';
import { MessageBus } from './message/messageBus';
import BasicShader from './gl/shaders/basicShader';
import { MaterialManager } from './graphics/materialManager';
import Material from './graphics/material';
import Color from './graphics/color';

export namespace TSE {
    export class Engine {

        private _canvas: HTMLCanvasElement;
        private _basicShader: BasicShader;
        private _projection: Matrix4x4;

        private _sprite: Sprite

        public constructor() { }

        public start(): void {
            // Setup e retorna o canvas
            this._canvas = GLUtilities.initialize();
            // Inicializa o Asset Manager 
            AssetManager.initialize();

            gl.clearColor(0, 0, 0, 1);

            this._basicShader = new BasicShader();
            this._basicShader.use();

            // Load Materials
            MaterialManager.registerMaterial(new Material("crate","assets/textures/crate.jpg",new Color(0,128,255,255)));

            // Load
            this._projection = Matrix4x4.orthografic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);

            this._sprite = new Sprite("test", "crate");
            this._sprite.load();
            this._sprite.position.x = 200;
            this._sprite.position.y = 100;

            this.resize();
            this.loop();
        }

        private loop(): void {

            MessageBus.update(0);

            gl.clear(gl.COLOR_BUFFER_BIT);

            // Set uniforms
            let projectionPosition = this._basicShader.getUniformLocation("u_projection");
            gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

            this._sprite.draw(this._basicShader);

            requestAnimationFrame(this.loop.bind(this));
        }

        public resize(): void {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
                gl.viewport(0, 0, this._canvas.width, this._canvas.height);
                this._projection = Matrix4x4.orthografic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);
            }
        }

    }
}