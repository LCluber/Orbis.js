//import { Logger, Group } from "@lcluber/mouettejs";
import { HTTP, ResponseDataType } from "@lcluber/aiasjs";

export function loadSound(path: string): Promise<ResponseDataType> {
  // HTTP.setLogLevel("info");
  return HTTP.GET(path, "audiobuffer");
}
