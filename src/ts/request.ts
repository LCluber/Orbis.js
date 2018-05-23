import * as WEE     from '../../bower_components/Weejs/dist/wee';
import * as MOUETTE from '../../bower_components/Mouettejs/dist/mouette';
import * as TAIPAN  from '../../bower_components/Taipanjs/dist/taipan';

export class Request {

  fsm : TAIPAN.FSM;


  constructor() {
    this.fsm = new TAIPAN.FSM([
                  { name: 'send',    from: 'idle',    to: 'pending' },
                  { name: 'success', from: 'pending', to: 'success' },
                  { name: 'error',   from: 'pending', to: 'error'   }
                ]);
  }

  public send(path: string, type: string): Promise<HTMLImageElement|HTMLAudioElement|string|false> {
    if (this.fsm['send']()) {
      return WEE[WEE.String.ucfirst(type)].load(path).then(
        (response:HTMLImageElement|HTMLAudioElement|string) => {
          this.fsm['success']();
          return response;
        }
      ).catch(
        (err: Error) => {
          //console.log('error', path);
          //console.log('error', err.message);
          MOUETTE.Logger.error(err.message);
          this.fsm['error']();
          return false;
        }
      );
    }

  }

};
