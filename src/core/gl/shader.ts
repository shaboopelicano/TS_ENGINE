import { gl } from './gl';

export class Shader {

    private _name: string;
    private _program: WebGLProgram;
    private _attributes: { [name: string]: number } = {}; // hasmap ou dicionario em js , muito estranho!
    private _uniforms: { [name: string]: WebGLUniformLocation } = {}; // uniforms são como variáveis globais

    public constructor(name: string, vertexSource: string, fragmentSource: string) {
        this._name = name;
        let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
        let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

        this.createProgram(vertexShader, fragmentShader);
        this.detectAttributes();
        this.detectUniforms();
    }

    public get name(): string {
        return this._name;
    }

    private loadShader(source: string, shaderType: number): WebGLShader {
        let shader: WebGLShader = gl.createShader(shaderType);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const error = gl.getShaderInfoLog(shader);
        if (error !== '')
            throw new Error(`Error compiling shader(${this._name}): ` + error);

        return shader;
    }

    /* 
    Pega retorna a localização do attributo baseado no seu nome
    @param name - nome do attributo dentro do shader
    */
    public getAttributeLocation(name: string): number {
        if (this._attributes[name] === undefined)
            throw new Error(`Unable to find attribute ${name} in shader ${this._name}`);
        return this._attributes[name];
    }

    /* 
    Pega retorna a localização do attributo baseado no seu nome
    @param name - nome do attributo dentro do shader
    */
    public getUniformLocation(name: string): WebGLUniformLocation {
        if (this._uniforms[name] === undefined)
            throw new Error(`Unable to find uniform ${name} in shader ${this._name}`);
        return this._uniforms[name];
    }

    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
        this._program = gl.createProgram();
        gl.attachShader(this._program, vertexShader);
        gl.attachShader(this._program, fragmentShader);

        gl.linkProgram(this._program);
        const error = gl.getProgramInfoLog(this._program);
        if (error !== '')
            throw new Error(`Error linking shader(${this._name}): ${error}`);
    }

    public use(): void {
        gl.useProgram(this._program);
    }

    private detectAttributes(): void {
        // Vai voltar um numero 
        const atrributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < atrributeCount; ++i) {
            const attributeInfo: WebGLActiveInfo = gl.getActiveAttrib(this._program, i);
            if (!attributeInfo) break;

            // Guarda no dicionario
            this._attributes[attributeInfo.name] = gl.getAttribLocation(this._program, attributeInfo.name);

        }
    }

    private detectUniforms() {
        // Vai voltar um numero 
        const uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; ++i) {
            const uniformInfo: WebGLActiveInfo = gl.getActiveUniform(this._program, i);
            if (!uniformInfo) break;

            // Guarda no dicionario
            this._uniforms[uniformInfo.name] = gl.getUniformLocation(this._program, uniformInfo.name);

        }
    }

}