import { Logger, Group } from "@lcluber/mouettejs";
import { HTTP } from "@lcluber/aiasjs";

export function loadSound(path: string): Promise<AudioBuffer | false> {
  let log: Group = Logger.addGroup("Orbis");
  let context = new AudioContext();
  return HTTP.GET(path, "arraybuffer").then((response: ArrayBuffer) => {
    return context.decodeAudioData(
      response,
      buffer => {
        return buffer;
      },
      (e: DOMException) => {
        log.error("decodeAudioData error : " + e.message);
        return false;
      }
    );
  });
}
