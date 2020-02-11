import IAssetLoader from "./IAssetLoader";
import IAsset from "./IAsset";

export default class AssetManager {

    private static _loaders: IAssetLoader[] = [];
    private static _loadedAssets: { [name: string]: IAsset }; //hashmap em js é mto estranho

    private constructor() {

    }

    public static initialize(): void {

    }

    public static registerLoader(loader: IAssetLoader) {
        AssetManager._loaders.push(loader);
    }

    public static loadAsset(assetName: string): void {

    }

    public static isAssetLoaded(assetName:string):boolean{
        return AssetManager._loadedAssets[assetName] !== undefined;
    }

    public static getAsset(assetName : string) : IAsset{
        if(AssetManager._loadedAssets[assetName] !== undefined){
            return AssetManager._loadedAssets[assetName];
        }
        else{
            AssetManager.loadAsset(assetName);
        }

        //???
        return undefined;
    }
}