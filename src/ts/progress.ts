import { Binding, Dom } from "@lcluber/weejs";
import { Utils } from "@lcluber/type6js";
import { Player } from "@lcluber/frameratjs";

export class Progress {
  private rate: number;
  private target: number;
  private total: number;

  private percentage: number;
  private speed: number; //pixels per seconds
  public nbAssets: number;

  private bar: Binding | null;
  private barWidth: number;
  private number: Binding | null;
  private text: Binding | null;

  private animation: Player | null;
  public finished: boolean;

  constructor(barId: string | null, textId: string | null) {
    this.rate = 0.0;
    this.total = 0;
    this.percentage = 0.0;
    this.target = 0;
    this.speed = 40; //pixels per seconds
    this.nbAssets = 0;
    this.barWidth = 0;
    this.finished = false;
    this.bar = null;
    this.number = null;
    this.animation = null;
    if (barId) {
      let bar = Dom.findById(barId);
      if (bar) {
        this.barWidth = bar.clientWidth;
        let percentBar = bar.children[1];
        this.bar = percentBar
          ? new Binding(percentBar as HTMLElement, "style.width", "0px")
          : null;
        let number = bar.children[0];
        this.number = number ? new Binding(number as HTMLElement, "", 0) : null;
        this.animation = new Player(this.animateBar, 0);
        this.animation.setScope(this);
      }
    }
    this.text = textId ? new Binding(textId, "", "Loading") : null;
  }

  private animateBar() {
    if (this.animation) {
      this.finished = this.updateBar(this.animation.getDelta());
      if (!this.finished) {
        this.animation.requestNewFrame();
      }
    }
  }

  public start() {
    if (this.animation) {
      this.animation.play();
    }
  }

  public update(text: string): void {
    this.total++;
    this.rate = this.total / this.nbAssets;
    this.target = Math.round(this.rate * 100);
    if (this.text) {
      this.text.update(text);
    }
  }

  public updateBar(delta: number): boolean {
    this.percentage += this.speed * delta;
    if (this.percentage >= this.target) {
      this.percentage = this.target;
    }
    let flooredPercentage = Utils.floor(this.percentage, 0);
    if (this.bar) {
      this.bar.update(
        Utils.map(this.percentage, 0, 100, 0, this.barWidth) + "px"
      );
    }
    if (this.number) {
      this.number.update(flooredPercentage + "%");
    }
    if (flooredPercentage === 100) {
      if (this.animation) {
        this.animation.stop();
      }
      if (this.text) {
        this.text.update("Loading complete");
      }
      return true;
    }
    return false;
  }
}
