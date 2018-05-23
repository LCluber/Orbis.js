import * as WEE from '../../bower_components/Weejs/dist/wee';
export declare class Progress {
    rate: number;
    target: number;
    total: number;
    percentage: number;
    speed: number;
    nbAssets: number;
    bar: WEE.Bind;
    text: WEE.Bind;
    constructor(barId: string, textId: string, nbAssets: number);
    update(text: string): void;
    updateBar(delta: number): number;
}
