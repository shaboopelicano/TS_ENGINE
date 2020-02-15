import IAssetLoader from "./IAssetLoader";
import IAsset from "./IAsset";
import Message from "../message/message";
import { ImageAssetLoader } from "./imageAssetLoader";

export const MESSAGE_ASSET_LOADER_ASSET_LOADED = "MESSAGE_ASSET_LOADER_ASSET_LOADED::";

export default class AssetManager {

    private static _loaders: IAssetLoader[] = [];
    private static _loadedAssets: { [name: string]: IAsset } = {}; //hashmap em js é mto estranho

    private constructor() {}

    public static initialize(): void {
        AssetManager._loaders.push(new ImageAssetLoader());
    }

    public static registerLoader(loader: IAssetLoader) {
        AssetManager._loaders.push(loader);
    }

    public static onAssetLoaded(asset: IAsset): void {
        AssetManager._loadedAssets[asset.name] = asset;
        Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset);
    }

    public static loadAsset(assetName: string): void {
        let extension = assetName.split('.').pop().toLowerCase();
        for (let l of AssetManager._loaders) {
            if (l.supportedExtentions.indexOf(extension) !== -1) {
                l.loadAsset(assetName);
                return;
            }
        }
        console.warn("Unable to load asset with extension " + extension + " becouse the is no loader associated with it.");
    }

    public static isAssetLoaded(assetName: string): boolean {
        return AssetManager._loadedAssets[assetName] !== undefined;
    }

    public static getAsset(assetName: string): IAsset {
        if (AssetManager._loadedAssets[assetName] !== undefined) {
            return AssetManager._loadedAssets[assetName];
        }
        else {
            AssetManager.loadAsset(assetName);
        }

        return undefined;
    }
}