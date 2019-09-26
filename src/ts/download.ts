// import {Is} from '@lcluber/chjs';
import { Request } from "./request";

export class Download {
  path: string;
  file: string;
  extension: string;
  type: string;
  response: Object | HTMLImageElement | AudioBuffer | string | null;
  request: Request;

  constructor(path: string, file: string, extension: string, type: string) {
    this.path = path;
    this.file = file;
    this.extension = extension;
    this.type = type;
    this.request = new Request();
    this.response = null;
  }

  public sendRequest(): Promise<string> {
    if (this.response) {
      return new Promise(() => {
        return this.file;
      });
    } else {
      return this.request
        .send(this.path + this.file, this.type)
        .then(response => {
          if (response) {
            this.response = response;
            // if(this.type === 'file') {
            //   let json = Is.json(response as string);
            //   if (json) {
            //     this.response = json;
            //   }
            // }
          }
          return this.file;
        });
    }
  }

  public getRequestStatus(): string | number | boolean {
    return this.request.fsm.state;
  }

  public isRequestSent(): boolean {
    if (this.getRequestStatus() != "idle") {
      return true;
    }
    return false;
  }
}
