// import {Is} from '@lcluber/chjs';
import { Request } from "./request";

export class XHR {
  path: string;
  extension: string;
  type: string;
  response: Object | HTMLImageElement | AudioBuffer | string | null;
  request: Request;

  constructor(path: string, extension: string, type: string) {
    this.path = path;
    this.extension = extension;
    this.type = type;
    this.request = new Request();
    this.response = null;
  }

  public sendRequest(fileName: string): Promise<string> {
    if (this.response) {
      return new Promise(() => {
        return fileName;
      });
    } else {
      return this.request
        .send(this.path + fileName, this.type)
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
          return fileName;
        });
    }
  }

  public getRequestStatus(): string | number | boolean {
    return this.request ? this.request.fsm.state : "done";
  }

  public isRequestSent(): boolean {
    if (this.getRequestStatus() != "idle") {
      delete this.request;
      return true;
    }
    return false;
  }
}
