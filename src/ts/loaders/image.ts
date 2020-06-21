// import { Logger, Group } from "@lcluber/mouettejs";

export function loadImage(path: string): Promise<string> {
  // let log: Group = Logger.addGroup("Orbis");
  return new Promise((resolve: Function, reject: Function) => {
    let img = new Image();
    img.src = path;
    img.name = getName(path);
    // log.info("xhr processing starting (" + path + ")");
    img.addEventListener("load", () => {
      // log.info("xhr (" + path + ") done");
      resolve(img);
    });
    img.addEventListener("error", () => {
      // log.error("xhr (" + path + ") failed");
      reject(new Error("xhr (" + path + ") failed"));
    });
  });
}

function getName(path: string): string {
  return path.replace(/^.*[\\\/]/, "");
  //var filename = path.split('/').pop();
  //return filename.split('.').shift();
}
