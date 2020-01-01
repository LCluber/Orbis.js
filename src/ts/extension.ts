import { ValidExtensions } from "./types";

export class Extension {
  public static validExtensions: ValidExtensions = {
    file: ["txt", "text", "json", "glsl", "babylon"],
    img: ["png", "jpg", "jpeg", "gif"],
    sound: ["mp3", "ogg", "wav"]
  };

  public static get(path: string): string | undefined {
    return path.split(".").pop();
  }

  public static getAssetType(extension: string): string | false {
    for (let property in this.validExtensions) {
      if (this.validExtensions.hasOwnProperty(property)) {
        if (this.check(extension, this.validExtensions[property])) {
          return property;
        }
      }
    }
    return false;
  }

  private static check(extension: string, validExtensions: string[]): boolean {
    return validExtensions.some(validExtension => extension === validExtension);
  }
}
