import * as WEE from '../../bower_components/Weejs/dist/wee';
var Progress = (function () {
    function Progress(barId, textId, nbAssets) {
        this.rate = 0.0;
        this.total = 0;
        this.percentage = 0.0;
        this.target = 0;
        this.speed = 40;
        this.nbAssets = nbAssets;
        if (barId) {
            var element = WEE.Dom.findById(barId);
            if (element) {
                this.bar = new WEE.Bind(element, '0');
            }
        }
        if (textId) {
            var element = WEE.Dom.findById(textId);
            if (element) {
                this.text = new WEE.Bind(element, 'Loading started');
            }
        }
    }
    Progress.prototype.update = function (text) {
        this.total++;
        this.rate = this.total / this.nbAssets;
        this.target = Math.round(this.rate * 100);
        this.text.change(text);
    };
    Progress.prototype.updateBar = function (delta) {
        delta *= 0.001;
        this.percentage += this.speed * delta;
        if (this.percentage >= this.target) {
            this.percentage = this.target;
        }
        this.bar.change(this.percentage);
        if (this.percentage === 100) {
            this.text.change('Loading complete');
        }
        return this.percentage;
    };
    return Progress;
}());
export { Progress };
//# sourceMappingURL=progress.js.map