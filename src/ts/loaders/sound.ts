import { Logger, Group } from "@lcluber/mouettejs";

export class Sound {
  private static log: Group = Logger.addGroup("Orbis");
  static load(path: string): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
      let snd = new Audio();
      snd.src = path;
      //snd.name = String.getFileName(path);
      this.log.info("xhr processing starting (" + path + ")");
      snd.addEventListener(
        "canplaythrough",
        () => {
          this.log.info("xhr done successfully (" + path + ")");
          resolve(snd);
        },
        false
      );
      snd.addEventListener(
        "canplay",
        () => {
          this.log.info("xhr done successfully (" + path + ")");
          resolve(snd);
        },
        false
      );
      snd.addEventListener(
        "error",
        () => {
          this.log.error("xhr failed (" + path + ")");
          reject(new Error("xhr failed (" + path + ")"));
        },
        false
      );
    });
  }
}
