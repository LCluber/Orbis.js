import { XHR } from "./xhr";
import { Extension } from "./extension";

type Params = {
  [key: string]: string | number | boolean | Array<string | number | boolean>;
} | null;

export class Asset {
  name: string;
  params?: Params;
  xhr?: XHR | null = null;
  isValid?: boolean = false;

  constructor(name: string, path: string, params?: Params) {
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
