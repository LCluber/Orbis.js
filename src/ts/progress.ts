import {Bind,Dom} from '@lcluber/weejs';

export class Progress {

  rate              : number;
  target            : number;
  total             : number;

  percentage        : number;
  speed             : number;//pixels per seconds
  nbAssets          : number;

  bar               : Bind|null;
  text              : Bind|null;//lastFileloaded

  constructor( barId: string|null, textId: string|null/*, nbAssets: number*/ ) {

    this.rate       = 0.0;
    this.total      = 0;
    this.percentage = 0.0;
    this.target     = 0;
    this.speed      = 40;//pixels per seconds
    this.nbAssets   = 0;
    this.bar = null;
    this.text = null;
    if(barId) {
      let element = Dom.findById(barId);
      if (element) {
        this.bar = new Bind(<HTMLProgressElement>element, '0');
      }
    }
    if(textId) {
      let element = Dom.findById(textId);
      if (element) {
        this.text = new Bind(<HTMLInputElement>element, 'Loading started');
      }
    }
  }

  public update(text: string): void {
    this.total++;
    this.rate = this.total / this.nbAssets;
    this.target = Math.round(this.rate * 100);
    if(this.text){
      this.text.change(text);
    }
  }

  public updateBar(delta: number): number {
    delta *= 0.001;//millisecond to second
    this.percentage += this.speed * delta;
    if (this.percentage >= this.target) {
      this.percentage = this.target;
    }
    if(this.bar) {
      this.bar.change(this.percentage);
    }
    if (this.percentage === 100 && this.text){
      this.text.change('Loading complete');
    }
    return this.percentage ;
  }

}
