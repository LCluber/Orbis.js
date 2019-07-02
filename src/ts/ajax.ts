import { Img } from "./loaders/image";
import { Sound } from "./loaders/sound";
import { File } from "./loaders/file";

export class Ajax {
  static file: File = File;
  static img: Img = Img;
  static sound: Sound = Sound;
}
