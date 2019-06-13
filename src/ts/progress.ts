import {Binding} from '@lcluber/weejs';

export class Progress {

  rate              : number;
  target            : number;
  total             : number;

  percentage        : number;
  speed             : number;//pixels per seconds
  nbAssets          : number;

  bar               : Binding|null;
  text              : Binding|null;//lastFileloaded

  constructor( barId: string|null, textId: string|null/*, nbAssets: number*/ ) {

    this.rate       = 0.0;
    this.total      = 0;
    this.percentage = 0.0;
    this.target     = 0;
    this.speed      = 40;//pixels per seconds
    this.nbAssets   = 0;
    this.bar        = barId ? new Binding(barId, 0) : null;
    this.text       = textId ? new Binding(textId, 'Loading started') : null;
  }

  public update(text: string): void {
    this.total++;
    this.rate = this.total / this.nbAssets;
    this.target = Math.round(this.rate * 100);
    if(this.text) {
      this.text.update(text);
    }
  }

  public updateBar(delta: number): number {
    delta *= 0.001;//millisecond to second
    this.percentage += this.speed * delta;
    if (this.percentage >= this.target) {
      this.percentage = this.target;
    }
    if(this.bar) {
      this.bar.update(this.percentage);
    }
    if (this.percentage === 100 && this.text) {
      this.text.update('Loading complete');
    }
    return this.percentage ;
  }

}
