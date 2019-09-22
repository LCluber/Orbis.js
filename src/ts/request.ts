import { FSM } from "@lcluber/taipanjs";
import { loadImage } from "./loaders/image";
import { loadSound } from "./loaders/sound";
import { loadFile } from "./loaders/file";

export type Ajax = {
  file: Function;
  img: Function;
  sound: Function;
};

export class Request {
  fsm: FSM;
  ajax: Ajax;

  constructor() {
    this.fsm = new FSM([
      { name: "send", from: "idle", to: "pending" },
      { name: "success", from: "pending", to: "success" },
      { name: "error", from: "pending", to: "error" }
    ]);
    this.ajax = {
      file: loadFile,
      img: loadImage,
      sound: loadSound
    };
  }

  public send(
    path: string,
    type: string
  ): Promise<HTMLImageElement | HTMLAudioElement | string | boolean> {
    // console.log(this.fsm);
    if (this.fsm["send"]()) {
      return this.ajax[type](path)
        .then(
          (
            response:
              | HTMLImageElement
              | HTMLAudioElement
              | string
              | Blob
              | AudioBuffer
          ) => {
            this.fsm["success"]();
            return response;
          }
        )
        .catch((/*err: Error*/) => {
          //console.log('error', path);
          //console.log('error', err.message);
          //this.log.error(err.message);
          this.fsm["error"]();
          return false;
        });
    } else {
      return new Promise(() => {
        return false;
      });
    }
  }
}
