import { GLBuffer, AttributeInfo } from '../gl/glBuffer';
import Vector3 from '../math/vector3';
import { Texture } from './texture';
import TextureManager from './textureManager';
import { Shader } from '../gl/shader';
import { gl } from '../gl/gl';

export class Sprite {

    private _name: string;
    private _width: number;
    private _height: number;

    private _buffer: GLBuffer;
    private _textureName: string;
    private _texture: Texture;

    public position: Vector3 = new Vector3();

    public constructor(name: string, textureName: string, width: number = 100, height: number = 100) {
        this._name = name;
        this._width = width;
        this._height = height;
        this._textureName = textureName;
        this._texture = TextureManager.getTexture(textureName);
    }

    public get name(): string {
        return this._name;
    }

    public destroy(): void {
        this._buffer.destroy();
        TextureManager.releaseTexture(this._textureName);
    }

    public load(): void {

        //Esses são os os pontos do quad do sprite
        const vertices = [
            // x,y,z   , u , v
            0, 0, 0, 0, 0,
            0, this._height, 0, 0, 1.0,
            this._width, this._height, 0, 1.0, 1.0,

            this._width, this._height, 0, 1.0, 1.0,
            this._width, 0, 0, 1.0, 0.0,
            0, 0, 0, 0, 0
        ];

        const positionAttribute = new AttributeInfo();
        // positionAttribute.location = this._shader.getAttributeLocation('a_position');
        positionAttribute.location = 0; // location sempre vai ser na posição 0
        positionAttribute.offset = 0;
        positionAttribute.size = 3;

        const texCoordAttribute = new AttributeInfo();
        positionAttribute.location = 1; // location sempre vai ser na posição 0
        positionAttribute.offset = 3;
        positionAttribute.size = 2;

        this._buffer = new GLBuffer(5);
        this._buffer.pushBackData(vertices);
        this._buffer.addAttributeLocation(positionAttribute);
        this._buffer.addAttributeLocation(texCoordAttribute);
        this._buffer.upload();
        this._buffer.unbind();

    }

    public update(time: number): void {

    }

    public draw(shader: Shader): void {

        this._texture.activateAndBind(0);
        const diffuseLocation = shader.getUniformLocation('u_diffuse');
        gl.uniform1i(diffuseLocation, 0);

        this._buffer.bind();
        this._buffer.draw();
    }
}