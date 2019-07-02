import { FSM } from "@lcluber/taipanjs";
import { Ajax } from "./ajax";

export class Request {
  fsm: FSM;
  ajax: Ajax;

  constructor() {
    this.fsm = new FSM([
      { name: "send", from: "idle", to: "pending" },
      { name: "success", from: "pending", to: "success" },
      { name: "error", from: "pending", to: "error" }
    ]);
    this.ajax = Ajax;
  }

  public send(
    path: string,
    type: string
  ): Promise<HTMLImageElement | HTMLAudioElement | string | boolean> {
    // console.log(this.fsm);
    if (this.fsm["send"]()) {
      return this.ajax[type]
        .load(path)
        .then((response: HTMLImageElement | HTMLAudioElement | string) => {
          this.fsm["success"]();
          return response;
        })
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
