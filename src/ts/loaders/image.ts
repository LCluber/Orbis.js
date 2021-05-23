export function loadImage(path: string): Promise<string> {
  return new Promise((resolve: Function, reject: Function) => {
    let img = new Image();
    img.src = path;
    img.name = getName(path);
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.addEventListener("error", () => {
      reject(new Error("xhr (" + path + ") failed"));
    });
  });
}

function getName(path: string): string {
  return path.replace(/^.*[\\\/]/, "");
  //var filename = path.split('/').pop();
  //return filename.split('.').shift();
}
