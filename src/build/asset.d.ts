import { Request } from './request';
export declare class Asset {
    path: string;
    file: string;
    extension: string;
    type: string;
    response: Object | HTMLImageElement | HTMLAudioElement | string | false;
    request: Request;
    constructor(path: string, file: string, extension: string, type: string);
    sendRequest(): Promise<string>;
    getRequestStatus(): string;
    isRequestSent(): boolean;
}
