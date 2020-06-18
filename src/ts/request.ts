import { FSM } from "@lcluber/taipanjs";
import { loadImage } from "./loaders/image";
import { loadSound } from "./loaders/sound";
import { loadFile } from "./loaders/file";
import { IAjax } from "./interfaces";

export class Request {
  fsm: FSM;
  ajax: IAjax;

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
  ): Promise<HTMLImageElement | AudioBuffer | string | Object | null> {
    if (this.fsm["send"]()) {
      return this.ajax[type](path)
        .then((response: HTMLImageElement | AudioBuffer | string | Object) => {
          this.fsm["success"]();
          return response;
        })
        .catch((/*err: Error*/) => {
          this.fsm["error"]();
          return null;
        });
    } else {
      return new Promise(() => {
        return null;
      });
    }
  }
}
