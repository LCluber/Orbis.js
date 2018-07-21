/** MIT License
* 
* Copyright (c) 2011 Ludovic CLUBER 
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* http://orbisjs.lcluber.com
*/

export declare class Ajax {
    static file: File;
    static img: Img;
    static sound: Sound;
}

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


export declare type ValidExtensions = {
    file: Array<string>;
    img: Array<string>;
    sound: Array<string>;
};
export declare type Default = {
    maxPending: number;
    tick: number;
};
export declare class Loader {
    assets: Object;
    progress: Progress;
    pendingRequests: number;
    tick: number;
    maxPendingRequests: number;
    default: Default;
    validExtensions: ValidExtensions;
    constructor();
    getAsset(name: string): Asset | false;
    getList(type: string): Array<Asset> | false;
    launch(configFilePath: string, assetsPath: string, progressBarId: string, progressTextId: string): Promise<void>;
    private getAssetType;
    private createAssets;
    private sendRequest;
    private getNextAssetToLoad;
}

export declare class Progress {
    rate: number;
    target: number;
    total: number;
    percentage: number;
    speed: number;
    nbAssets: number;
    bar: Bind;
    text: Bind;
    constructor(barId: string, textId: string, nbAssets: number);
    update(text: string): void;
    updateBar(delta: number): number;
}


export declare class Request {
    fsm: FSM;
    ajax: Ajax;
    constructor();
    send(path: string, type: string): Promise<HTMLImageElement | HTMLAudioElement | string | false>;
}
