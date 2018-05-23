import * as TAIPAN from '../../bower_components/Taipanjs/dist/taipan';
export declare class Request {
    fsm: TAIPAN.FSM;
    constructor();
    send(path: string, type: string): Promise<HTMLImageElement | HTMLAudioElement | string | false>;
}
