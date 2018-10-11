
import {Check} from '@lcluber/weejs';
import { Request } from './request';

export class Asset {

  path      : string;
  file      : string;
  extension : string;
  type      : string;
  response  : Object|HTMLImageElement|HTMLAudioElement|string|false;
  request   : Request;


  constructor( path: string, file: string, extension: string, type: string ){

    this.path      = path;
    this.file      = file;
    this.extension = extension;
    this.type      = type;
    this.request   = new Request();

  }

  public sendRequest(): Promise<string> {
    return this.request.send(this.path + this.file, this.type).then(
      (response) => {
        if (response) {
          this.response = response;
          if(this.type === 'file') {
            let json = Check.isJSON(response as string);
            if (json) {
              this.response = json;
            }
          }
        }
        return this.file;
      }
    );
  }

  public getRequestStatus(): string {
    return this.request.fsm.state;
  }

  public isRequestSent(): boolean {
    if(this.getRequestStatus() != 'idle') {
      return true;
    }
    return false;
  }

}
