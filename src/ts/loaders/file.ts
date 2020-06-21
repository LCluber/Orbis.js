import { HTTP, ResponseDataType } from "@lcluber/aiasjs";

export function loadFile(path: string): Promise<ResponseDataType> {
  return HTTP.get(path, "text") as Promise<ResponseDataType>;
}
