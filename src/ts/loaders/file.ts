import { HTTP, DataType } from "@lcluber/aiasjs";

export function loadFile(path: string): Promise<DataType> {
  return HTTP.GET(path);
}
