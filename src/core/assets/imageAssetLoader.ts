import IAssetLoader from "./IAssetLoader";
import IAsset from "./IAsset";
import AssetManager from "./assetManager";

export class ImageAsset implements IAsset {
    public readonly name: string;
    public readonly data: HTMLImageElement;

    public constructor(name: string, data: HTMLImageElement) {
        this.name = name;
        this.data = data;
    }

    public get width(): number {
        return this.data.width;
    }

    public get height(): number {
        return this.data.height;
    }
}

export class ImageAssetLoader implements IAssetLoader {
    public get supportedExtentions(): string[] {
        return ["png", "gif", "jpg"];
    }
    public loadAsset(assetName: string): void {
        let image: HTMLImageElement = new Image()
        image.onload = this.onImageLoaded.bind(this, assetName, image);
        image.src = "../src/"+ assetName;
    }

    private onImageLoaded(assetName: string, image: HTMLImageElement): void {
        console.log("onimageloaded : assetName/image", assetName, image);
        let asset = new ImageAsset(assetName, image);
        AssetManager.onAssetLoaded(asset)
    }

}

