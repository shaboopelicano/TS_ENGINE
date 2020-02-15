import { Texture } from "./texture";
import Color from "./color";
import TextureManager from "./textureManager";

export default class Material {

    private _name: string;
    private _diffuseTextureName: string;
    private _diffuseTexture: Texture;
    private _tint: Color;

    public constructor(name: string, diffuseTextureName: string, tint: Color) {
        this._name = name;
        this._diffuseTextureName = diffuseTextureName;
        this._tint = tint;

        if (this._diffuseTexture === undefined)
            this._diffuseTexture = TextureManager.getTexture(this._diffuseTextureName);
    }

    public get name(): string {
        return this._name;
    }

    public get diffuseTexture(): Texture {
        return this._diffuseTexture;
    }    

    public get tint(): Color {
        return this._tint;
    }    

    public get diffuseTextureName(): string {
        return this.diffuseTextureName;
    }

    public set diffuseTextureName(value: string) {
        if (this._diffuseTexture !== undefined) {
            TextureManager.releaseTexture(this._diffuseTextureName);
        }
        this.diffuseTextureName = value;

        if (this._diffuseTexture !== undefined)
            this._diffuseTexture = TextureManager.getTexture(this._diffuseTextureName);
    }

    public destroy(): void {
        TextureManager.releaseTexture(this._diffuseTextureName);
        this._diffuseTextureName = undefined;
    }

}