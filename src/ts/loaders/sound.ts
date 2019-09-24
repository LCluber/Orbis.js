//import { Logger, Group } from "@lcluber/mouettejs";
import { HTTP, ResponseDataType } from "@lcluber/aiasjs";

export function loadSound(path: string): Promise<ResponseDataType> {
  // let log: Group = Logger.addGroup("Orbis");
  // let context = new AudioContext();
  return HTTP.GET(path, "audiobuffer");
  // .then((response: ArrayBuffer) => {
  //   return context.decodeAudioData(
  //     response,
  //     buffer => {
  //       return buffer;
  //     },
  //     (e: DOMException) => {
  //       log.error("decodeAudioData error : " + e.message);
  //       return false;
  //     }
  //   );
  // });
}
