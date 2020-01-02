import { Asset } from "./asset";

export interface IAssets {
  [key: string]: {
    folder: string;
    files: Asset[];
  };
}

export interface IAsset {
  name: string;
  params?: IParams | null;
  [key: string]: any;
}

export interface IValidExtensions {
  file: string[];
  img: string[];
  sound: string[];
  [key: string]: string[];
}

export interface IDefault {
  maxPending: number;
  tick: number;
}

export interface IAjax {
  file: Function;
  img: Function;
  sound: Function;
}

export interface IResponse {
  success: boolean;
  message: string;
}

export interface IParams {
  [key: string]: string | number | boolean | Array<string | number | boolean>;
}
