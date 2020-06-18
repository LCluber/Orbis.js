import { HTTP, ResponseDataType } from "@lcluber/aiasjs";

export function loadFile(path: string): Promise<ResponseDataType> {
  // HTTP.setLogLevel("info");
  return HTTP.get(path, "text") as Promise<ResponseDataType>;
}
