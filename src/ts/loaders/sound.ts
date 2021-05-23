import { HTTP, ResponseDataType } from "@lcluber/aiasjs";

export function loadSound(path: string): Promise<ResponseDataType> {
  return HTTP.get(path, "audiobuffer") as Promise<ResponseDataType>;
}
