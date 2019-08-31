import { Logger, Group } from "@lcluber/mouettejs";

export function loadSound(path: string): Promise<string> {
  let log: Group = Logger.addGroup("Orbis");
  return new Promise((resolve: Function, reject: Function) => {
    let snd = new Audio();
    snd.src = path;
    //snd.name = String.getFileName(path);
    log.info("xhr processing starting (" + path + ")");
    snd.addEventListener(
      "canplaythrough",
      () => {
        log.info("xhr done successfully (" + path + ")");
        resolve(snd);
      },
      false
    );
    snd.addEventListener(
      "canplay",
      () => {
        log.info("xhr done successfully (" + path + ")");
        resolve(snd);
      },
      false
    );
    snd.addEventListener(
      "error",
      () => {
        log.error("xhr failed (" + path + ")");
        reject(new Error("xhr failed (" + path + ")"));
      },
      false
    );
    snd.addEventListener(
      "stalled",
      () => {
        log.error("xhr failed (" + path + ")");
        reject(new Error("xhr failed (" + path + ")"));
      },
      false
    );
  });
}
