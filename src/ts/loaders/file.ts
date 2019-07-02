import { HTTP, DataType } from "@lcluber/aiasjs";

export class File {
  static load(path: string): Promise<DataType> {
    return HTTP.GET(path);
  }
}
