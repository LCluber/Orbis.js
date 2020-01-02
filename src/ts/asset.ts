import { XHR } from "./xhr";
import { Extension } from "./extension";
import { IAsset, IParams } from "./interfaces";

export class Asset implements IAsset {
  name: string;
  params: IParams | null;
  xhr: XHR | null = null;
  isValid: boolean = false;

  constructor(name: string, path: string, params?: IParams | null) {
    this.name = name;
    this.params = params || null;
    let extension = Extension.get(name);
    if (extension) {
      let type = Extension.getAssetType(extension);
      if (type) {
        this.xhr = new XHR(path, extension, type);
        this.isValid = true;
      }
    }
  }

  public getContent():
    | Object
    | HTMLImageElement
    | AudioBuffer
    | string
    | null
    | false {
    if (this.xhr) {
      return this.xhr.response;
    }
    return false;
  }
}
