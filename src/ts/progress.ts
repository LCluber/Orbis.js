import * as WEE from '../../bower_components/Weejs/dist/wee';

export class Progress {

  rate              : number;
  target            : number;
  total             : number;

  percentage        : number;
  speed             : number;//pixels per seconds
  nbAssets          : number;

  bar               : WEE.Bind;
  text              : WEE.Bind;//lastFileloaded

  constructor( barId: string, textId: string, nbAssets: number ) {

    this.rate       = 0.0;
    this.total      = 0;
    this.percentage = 0.0;
    this.target     = 0;
    this.speed      = 40;//pixels per seconds
    this.nbAssets   = nbAssets;
    if(barId) {
      let element = WEE.Dom.findById(barId);
      if (element) {
        this.bar = new WEE.Bind(<HTMLProgressElement>element, '0');
      }
    }
    if(textId) {
      let element = WEE.Dom.findById(textId);
      if (element) {
        this.text = new WEE.Bind(<HTMLInputElement>element, 'Loading started');
      }
    }
  }

  public update(text: string): void {
    this.total++;
    this.rate = this.total / this.nbAssets;
    this.target = Math.round(this.rate * 100);
    this.text.change(text);
  }

  public updateBar(delta: number): number {
    delta *= 0.001;//millisecond to second
    this.percentage += this.speed * delta;
    if (this.percentage >= this.target) {
      this.percentage = this.target;
    }
    this.bar.change(this.percentage);
    if (this.percentage === 100){
      this.text.change('Loading complete');
    }
    return this.percentage ;
  }

}