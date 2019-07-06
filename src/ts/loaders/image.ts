import { Logger, Group } from "@lcluber/mouettejs";
import { File as WeeFile } from "@lcluber/weejs";

export function loadImage(path: string): Promise<string> {
  let log: Group = Logger.addGroup("Orbis");
  return new Promise((resolve: Function, reject: Function) => {
    let img = new Image();
    img.src = path;
    img.name = WeeFile.getName(path);
    log.info("xhr processing starting (" + path + ")");
    img.addEventListener("load", () => {
      log.info("xhr done successfully (" + path + ")");
      resolve(img);
    });
    img.addEventListener("error", () => {
      log.error("xhr failed (" + path + ")");
      reject(new Error("xhr failed (" + path + ")"));
    });
  });
}
