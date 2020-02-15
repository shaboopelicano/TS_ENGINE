import { Shader } from "../shader";

export default class BasicShader extends Shader {

    public constructor() {
        super('basic');
        this.load(this.getVertexSource(),this.getFragmentSource());
    }

    private getVertexSource(): string {
        return`
    attribute vec3 a_position;           
    attribute vec2 a_texCoord;           
    
    uniform mat4 u_projection;

    varying vec2 v_texCoord;

    //Representa posicao,rotacao e scale
    uniform mat4 u_model;
    
    void main(){
        // gl_Position é uma variável global do WebGL 
        gl_Position = u_projection * u_model * vec4(a_position,1.0);
        v_texCoord = a_texCoord;
    }
    `;


    }

    private getFragmentSource(): string {
        return`
    precision mediump float;
    //uniform vec4 u_color;

    uniform vec4 u_tint;

    uniform sampler2D u_diffuse;

    varying vec2 v_texCoord;

    void main(){
        // assim como gl_Position , gl_FragColor é uma variável global do WebGL
        gl_FragColor = u_tint  * texture2D(u_diffuse,v_texCoord);
    }
    `;
    }



}