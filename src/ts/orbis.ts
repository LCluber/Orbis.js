import { XHR } from "./xhr";
import { Progress } from "./progress";
import { IAssets, IDefault, IResponse } from "./interfaces";
import { Asset } from "./asset";

export class Loader {
  assets: IAssets; //data from the assets file
  path: string;
  progress: Progress;
  pendingRequests: number;

  tick: number;
  maxPendingRequests: number;
  default: IDefault;

  // log: Group;

  constructor(
    assets: IAssets,
    assetsPath: string,
    progressBarId?: string,
    progressTextId?: string
  ) {
    this.default = {
      maxPending: 6,
      tick: 100
    };

    this.assets = assets;
    this.path = this.removeTrailingSlash(assetsPath);
    this.pendingRequests = 0;
    this.tick = this.default.tick;
    this.maxPendingRequests = this.default.maxPending;
    this.progress = new Progress(progressBarId, progressTextId);

    this.createAssets();
  }

  // public setTick(duration: number): void {
  //   this.tick.duration = duration;
  // }
  //
  // public setMaxPendingRequests(maxPendingRequests: number): void {
  //   this.maxPendingRequests = maxPendingRequests;
  // }

  // public setLogLevel(name: LevelName): LevelName {
  //   return this.log.setLevel(name);
  // }

  // public getLogLevel(): LevelName {
  //   return this.log.getLevel();
  // }

  public getAsset(name: string): Asset | false {
    for (let property in this.assets) {
      if (this.assets.hasOwnProperty(property)) {
        for (let file of this.assets[property].files) {
          if (file.name === name) {
            return file as Asset;
          }
        }
      }
    }
    return false;
  }

  public getContent(
    name: string
  ): Object | HTMLImageElement | AudioBuffer | string | null | false {
    let asset = this.getAsset(name);
    if (asset) {
      return asset.getContent();
    }
    return false;
  }

  public getList(type: string): Asset[] | false {
    if (this.assets.hasOwnProperty(type)) {
      return this.assets[type].files as Asset[];
    }
    return false;
  }

  public start(): Promise<IResponse> {
    return new Promise((resolve: Function, reject: Function) => {
      if (this.progress.nbAssets) {
        this.progress.start();
        let intervalID = setInterval(() => {
          this.sendRequest();
          if (!this.progress.running) {
            clearInterval(intervalID);
            if (this.progress.total) {
              resolve({
                success: true,
                message: `${this.progress.total} assets loaded`
              });
            } else {
              reject({
                success: false,
                message: `!! ${this.progress.total} assets loaded`
              });
            }
          }
        }, this.tick);
      } else {
        reject({ success: false, message: "!! nothing to load here" });
      }
    });
  }

  public resetProgress() {
    this.progress.reset();
  }

  private createAssets(): void {
    this.progress.nbAssets = 0;
    for (let property in this.assets) {
      if (this.assets.hasOwnProperty(property)) {
        let type = this.assets[property];
        let folder = type.folder ? `${type.folder}/` : "";
        for (let i = 0; i < type.files.length; i++) {
          let file = type.files[i];
          if (!file.xhr && file.hasOwnProperty("name")) {
            (type.files[i] as Asset) = new Asset(
              file.name,
              `${this.path}/${folder}`,
              file.params || null
            );
            if (type.files[i].isValid) {
              this.progress.nbAssets++;
            }
          }
        }
      }
    }
  }

  private sendRequest(): boolean {
    if (this.pendingRequests < this.maxPendingRequests) {
      let nextAsset = this.getNextAssetToLoad();
      if (nextAsset) {
        (nextAsset.xhr as XHR)
          .sendRequest(nextAsset.name)
          .then((response: string) => {
            this.pendingRequests--;
            this.progress.update(response);
          });
        return true;
      }
    }
    return false;
  }

  private getNextAssetToLoad(): Asset | false {
    for (let property in this.assets) {
      if (this.assets.hasOwnProperty(property)) {
        let type = this.assets[property];
        for (let file of type.files) {
          if (file.xhr && !file.xhr.isRequestSent()) {
            return file as Asset;
          }
        }
      }
    }
    return false;
  }

  private removeTrailingSlash(path: string): string {
    return path.replace(/\/+$/, "");
  }
}
