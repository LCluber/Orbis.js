// import { Logger, Group } from "@lcluber/mouettejs";
import { HTTP, DataType } from "@lcluber/aiasjs";

export function loadSound(path: string): Promise<DataType> {
  //const context = new AudioContext();
  return HTTP.GET(path);
  // .then((response: any) => { response ? response.arrayBuffer() : null})
  // .then((arrayBuffer: ArrayBuffer) => {arrayBuffer ? context.decodeAudioData(arrayBuffer) ? null });
}
