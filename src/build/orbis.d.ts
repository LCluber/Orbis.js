import { Asset } from './asset';
import { Progress } from './progress';
export declare type ValidExtensions = {
    file: Array<string>;
    img: Array<string>;
    sound: Array<string>;
};
export declare type Default = {
    maxPending: number;
    tick: number;
};
export declare class Loader {
    assets: Object;
    progress: Progress;
    pendingRequests: number;
    tick: number;
    maxPendingRequests: number;
    default: Default;
    validExtensions: ValidExtensions;
    constructor();
    getAsset(name: string): Asset | false;
    getList(type: string): Array<Asset> | false;
    launch(configFilePath: string, assetsPath: string, progressBarId: string, progressTextId: string): Promise<void>;
    private getAssetType(extension);
    private createAssets(path);
    private sendRequest();
    private getNextAssetToLoad();
}
