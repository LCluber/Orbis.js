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
import { Group, LevelName } from "@lcluber/mouettejs";


export declare type ValidExtensions = {
    file: string[];
    img: string[];
    sound: string[];
    [key: string]: string[];
};
export declare type Default = {
    maxPending: number;
    tick: number;
};
export interface Asset {
    name: string;
    params: {
        [key: string]: string | number | boolean | Array<string | number | boolean>;
    };
    xhr?: XHR;
}
export interface Assets {
    [key: string]: {
        folder: string;
        files: Asset[];
    };
}
export declare class Loader {
    assets: Assets;
    path: string;
    progress: Progress;
    pendingRequests: number;
    tick: number;
    maxPendingRequests: number;
    default: Default;
    validExtensions: ValidExtensions;
    log: Group;
    constructor(assets: Assets, assetsPath: string, progressBarId: string, progressTextId: string);
    setLogLevel(name: LevelName): LevelName;
    getLogLevel(): LevelName;
    getAsset(name: string): Asset | false;
    getList(type: string): Asset[] | false;
    launch(): Promise<void>;
    resetProgress(): void;
    private getAssetType;
    private createAssets;
    private sendRequest;
    private getNextAssetToLoad;
    private removeTrailingSlash;
    private getExtension;
    private checkExtension;
}
export declare class Progress {
    private rate;
    private target;
    private total;
    private percentage;
    private speed;
    nbAssets: number;
    private bar;
    private barWidth;
    private number;
    private text;
    private animation;
    running: boolean;
    constructor(barId: string | null, textId: string | null);
    private animateBar;
    start(): void;
    reset(): void;
    update(text: string): void;
    private updateBar;
}
import { FSM } from "@lcluber/taipanjs";
export declare type Ajax = {
    file: Function;
    img: Function;
    sound: Function;
};
export declare class Request {
    fsm: FSM;
    ajax: Ajax;
    constructor();
    send(path: string, type: string): Promise<HTMLImageElement | AudioBuffer | string | Object | null>;
}

export declare class XHR {
    path: string;
    extension: string;
    type: string;
    response: Object | HTMLImageElement | AudioBuffer | string | null;
    request: Request;
    constructor(path: string, extension: string, type: string);
    sendRequest(fileName: string): Promise<string>;
    getRequestStatus(): string | number | boolean;
    isRequestSent(): boolean;
}
