import { Asset } from "./asset";

export interface Assets {
  [key: string]: {
    folder: string;
    files: Asset[];
  };
}
