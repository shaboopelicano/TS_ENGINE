import IAsset from "./IAsset";

export default interface IAssetLoader {

    readonly supportedExtentions: string[];
    loadAsset(assetName: string): void;
}