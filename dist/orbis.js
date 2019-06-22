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

import { Binding, Dom, File, Img, Sound } from '@lcluber/weejs';
import { Logger } from '@lcluber/mouettejs';
import { FSM } from '@lcluber/taipanjs';

class Ajax {
}
Ajax.file = File;
Ajax.img = Img;
Ajax.sound = Sound;

class Request {
    constructor() {
        this.fsm = new FSM([
            { name: 'send', from: 'idle', to: 'pending' },
            { name: 'success', from: 'pending', to: 'success' },
            { name: 'error', from: 'pending', to: 'error' }
        ]);
        this.ajax = Ajax;
    }
    send(path, type) {
        if (this.fsm['send']()) {
            return this.ajax[type].load(path).then((response) => {
                this.fsm['success']();
                return response;
            }).catch((err) => {
                Logger.error(err.message);
                this.fsm['error']();
                return false;
            });
        }
        else {
            return new Promise(() => { return false; });
        }
    }
}

class Asset {
    constructor(path, file, extension, type) {
        this.path = path;
        this.file = file;
        this.extension = extension;
        this.type = type;
        this.request = new Request();
        this.response = null;
    }
    sendRequest() {
        if (this.response) {
            return new Promise(() => { return this.file; });
        }
        else {
            return this.request.send(this.path + this.file, this.type).then((response) => {
                if (response) {
                    this.response = response;
                }
                return this.file;
            });
        }
    }
    getRequestStatus() {
        return this.request.fsm.state;
    }
    isRequestSent() {
        if (this.getRequestStatus() != 'idle') {
            return true;
        }
        return false;
    }
}

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
* http://type6js.lcluber.com
*/

class Utils {
    static round(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.round(x * decimals) / decimals;
    }
    static floor(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.floor(x * decimals) / decimals;
    }
    static ceil(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.ceil(x * decimals) / decimals;
    }
    static trunc(x, decimals) {
        decimals = Math.pow(10, decimals);
        let v = +x * decimals;
        if (!isFinite(v)) {
            return v;
        }
        return ((v - v % 1) / decimals) || (v < 0 ? -0 : v === 0 ? v : 0);
    }
    static roundToNearest(x, nearest) {
        return Math.round(x / nearest) * nearest;
    }
    static mix(x, y, ratio) {
        return (1 - ratio) * x + ratio * y;
    }
    static sign(x) {
        return x ? x < 0 ? -1 : 1 : 0;
    }
    static opposite(x) {
        return -x;
    }
    static clamp(x, min, max) {
        return Math.min(Math.max(x, min), max);
    }
    static normalize(x, min, max) {
        return (x - min) / (max - min);
    }
    static lerp(normal, min, max) {
        return (max - min) * normal + min;
    }
    static map(x, sourceMin, sourceMax, destMin, destMax) {
        return this.lerp(this.normalize(x, sourceMin, sourceMax), destMin, destMax);
    }
    static isEven(x) {
        return !(x & 1);
    }
    static isOdd(x) {
        return x & 1;
    }
    static isOrigin(x) {
        return (x === 0) ? true : false;
    }
    static isPositive(x) {
        return x >= 0 ? true : false;
    }
    static isNegative(x) {
        return x < 0 ? true : false;
    }
    static contains(x, min, max) {
        return x >= min && x <= max;
    }
    static validate(x) {
        return isNaN(x) ? 0.0 : x;
    }
}

class Trigonometry {
    static init() {
        Trigonometry.createRoundedPis();
        Trigonometry.createFactorialArray();
    }
    static createRoundedPis() {
        let decimals = 2;
        this.pi = Utils.round(Math.PI, decimals);
        this.twopi = Utils.round(Math.PI * 2, decimals);
        this.halfpi = Utils.round(Math.PI * 0.5, decimals);
    }
    static createFactorialArray() {
        let maxSin = this.sineLoops[this.sineLoops.length - 1] * 3;
        let maxCos = this.cosineLoops[this.cosineLoops.length - 1] * 2;
        for (let i = 1, f = 1; i <= Math.max(maxSin, maxCos); i++) {
            f *= this.factorial(i);
            this.factorialArray.push(f);
        }
    }
    static factorial(i) {
        return i > 1 ? (i - 1) : 1;
    }
    static setSinePrecision(value) {
        if (value < this.sineLoops.length) {
            this.sineDecimals = value;
            return value;
        }
        this.sineDecimals = 2;
        return 2;
    }
    static setCosinePrecision(value) {
        if (value < Trigonometry.cosineLoops.length) {
            this.cosineDecimals = value;
            return value;
        }
        this.cosineDecimals = 2;
        return 2;
    }
    static setArctanPrecision(value) {
        if (value < Trigonometry.arctanLoops.length) {
            this.cosineDecimals = value;
            return value;
        }
        this.arctanDecimals = 2;
        return 2;
    }
    static degreeToRadian(degree) {
        return degree * this.pi / 180;
    }
    static radianToDegree(radian) {
        return radian * 180 / this.pi;
    }
    static normalizeRadian(angle) {
        if (angle > this.pi || angle < -this.pi) {
            return angle - this.twopi * Math.floor((angle + this.pi) / this.twopi);
        }
        return angle;
    }
    static sine(angle) {
        angle = this.normalizeRadian(angle);
        if (Trigonometry.sineDecimals <= 2 && (angle < 0.28 && angle > -0.28)) {
            return angle;
        }
        else {
            return this.taylorSerie(3, Trigonometry.sineLoops[this.sineDecimals], angle, angle, true);
        }
    }
    static cosine(angle) {
        angle = this.normalizeRadian(angle);
        var squaredAngle = angle * angle;
        if (this.cosineDecimals <= 2 && (angle <= 0.5 && angle >= -0.5)) {
            return 1 - (squaredAngle * 0.5);
        }
        else {
            return this.taylorSerie(2, Trigonometry.cosineLoops[this.cosineDecimals], 1, angle, true);
        }
    }
    static arctan2(x, y) {
        let angle = y / x;
        if (x > 0) {
            return this.arctan(angle);
        }
        else if (x < 0) {
            if (y < 0) {
                return this.arctan(angle) - this.pi;
            }
            else {
                return this.arctan(angle) + this.pi;
            }
        }
        else {
            if (y < 0) {
                return -this.halfpi;
            }
            else if (y > 0) {
                return this.halfpi;
            }
            else {
                return false;
            }
        }
    }
    static arctan2Vector2(vector2) {
        return this.arctan2(vector2.x, vector2.y);
    }
    static arctan(angle) {
        let loops = Trigonometry.arctanLoops[this.arctanDecimals];
        if (angle < 1 && angle > -1) {
            return this.taylorSerie(3, loops, angle, angle, false);
        }
        else {
            if (angle >= 1) {
                angle = 1 / angle;
                return -(this.taylorSerie(3, loops, angle, angle, false) - this.halfpi);
            }
            else {
                angle = -1 / angle;
                return this.taylorSerie(3, loops, angle, angle, false) - this.halfpi;
            }
        }
    }
    static sineEquation(amplitude, period, shiftX, shiftY) {
        return amplitude * this.sine(period + shiftX) + shiftY;
    }
    static cosineEquation(amplitude, period, shiftX, shiftY) {
        return amplitude * this.cosine(period + shiftX) + shiftY;
    }
    static arctanEquation(amplitude, period, shiftX, shiftY) {
        return amplitude * this.arctan(period + shiftX) + shiftY;
    }
    static taylorSerie(start, max, x, angle, needFactorial) {
        let squaredAngle = angle * angle;
        let result = x;
        let denominator = 0;
        let sign = -1;
        for (let i = 0; start <= max; start += 2, i++) {
            x *= squaredAngle;
            denominator = needFactorial ? this.factorialArray[start] : start;
            result += x / denominator * sign;
            sign = Utils.opposite(sign);
        }
        return result;
    }
}
Trigonometry.sineLoops = [
    9,
    11,
    13,
    15,
    17,
    18,
    19,
    21,
    23
];
Trigonometry.cosineLoops = [
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22
];
Trigonometry.arctanLoops = [
    17,
    19,
    21,
    23,
    25,
    27,
    29,
    31,
    33
];
Trigonometry.sineDecimals = 2;
Trigonometry.cosineDecimals = 2;
Trigonometry.arctanDecimals = 2;
Trigonometry.factorialArray = [];
Trigonometry.init();

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
* http://type6js.lcluber.com
*/

class Utils$1 {
    static round(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.round(x * decimals) / decimals;
    }
    static floor(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.floor(x * decimals) / decimals;
    }
    static ceil(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.ceil(x * decimals) / decimals;
    }
    static trunc(x, decimals) {
        decimals = Math.pow(10, decimals);
        let v = +x * decimals;
        if (!isFinite(v)) {
            return v;
        }
        return ((v - v % 1) / decimals) || (v < 0 ? -0 : v === 0 ? v : 0);
    }
    static roundToNearest(x, nearest) {
        return Math.round(x / nearest) * nearest;
    }
    static mix(x, y, ratio) {
        return (1 - ratio) * x + ratio * y;
    }
    static sign(x) {
        return x ? x < 0 ? -1 : 1 : 0;
    }
    static opposite(x) {
        return -x;
    }
    static clamp(x, min, max) {
        return Math.min(Math.max(x, min), max);
    }
    static normalize(x, min, max) {
        return (x - min) / (max - min);
    }
    static lerp(normal, min, max) {
        return (max - min) * normal + min;
    }
    static map(x, sourceMin, sourceMax, destMin, destMax) {
        return this.lerp(this.normalize(x, sourceMin, sourceMax), destMin, destMax);
    }
    static isEven(x) {
        return !(x & 1);
    }
    static isOdd(x) {
        return x & 1;
    }
    static isOrigin(x) {
        return (x === 0) ? true : false;
    }
    static isPositive(x) {
        return x >= 0 ? true : false;
    }
    static isNegative(x) {
        return x < 0 ? true : false;
    }
    static validate(x) {
        return isNaN(x) ? 0.0 : x;
    }
}

class Trigonometry$1 {
    static init() {
        Trigonometry$1.createRoundedPis();
        Trigonometry$1.createFactorialArray();
    }
    static createRoundedPis() {
        let decimals = 2;
        this.pi = Utils$1.round(Math.PI, decimals);
        this.twopi = Utils$1.round(Math.PI * 2, decimals);
        this.halfpi = Utils$1.round(Math.PI * 0.5, decimals);
    }
    static createFactorialArray() {
        let maxSin = this.sineLoops[this.sineLoops.length - 1] * 3;
        let maxCos = this.cosineLoops[this.cosineLoops.length - 1] * 2;
        for (let i = 1, f = 1; i <= Math.max(maxSin, maxCos); i++) {
            f *= this.factorial(i);
            this.factorialArray.push(f);
        }
    }
    static factorial(i) {
        return i > 1 ? (i - 1) : 1;
    }
    static setSinePrecision(value) {
        if (value < this.sineLoops.length) {
            this.sineDecimals = value;
            return value;
        }
        this.sineDecimals = 2;
        return 2;
    }
    static setCosinePrecision(value) {
        if (value < Trigonometry$1.cosineLoops.length) {
            this.cosineDecimals = value;
            return value;
        }
        this.cosineDecimals = 2;
        return 2;
    }
    static setArctanPrecision(value) {
        if (value < Trigonometry$1.arctanLoops.length) {
            this.cosineDecimals = value;
            return value;
        }
        this.arctanDecimals = 2;
        return 2;
    }
    static degreeToRadian(degree) {
        return degree * this.pi / 180;
    }
    static radianToDegree(radian) {
        return radian * 180 / this.pi;
    }
    static normalizeRadian(angle) {
        if (angle > this.pi || angle < -this.pi) {
            return angle - this.twopi * Math.floor((angle + this.pi) / this.twopi);
        }
        return angle;
    }
    static sine(angle) {
        angle = this.normalizeRadian(angle);
        if (Trigonometry$1.sineDecimals <= 2 && (angle < 0.28 && angle > -0.28)) {
            return angle;
        }
        else {
            return this.taylorSerie(3, Trigonometry$1.sineLoops[this.sineDecimals], angle, angle, true);
        }
    }
    static cosine(angle) {
        angle = this.normalizeRadian(angle);
        var squaredAngle = angle * angle;
        if (this.cosineDecimals <= 2 && (angle <= 0.5 && angle >= -0.5)) {
            return 1 - (squaredAngle * 0.5);
        }
        else {
            return this.taylorSerie(2, Trigonometry$1.cosineLoops[this.cosineDecimals], 1, angle, true);
        }
    }
    static arctan2(x, y) {
        let angle = y / x;
        if (x > 0) {
            return this.arctan(angle);
        }
        else if (x < 0) {
            if (y < 0) {
                return this.arctan(angle) - this.pi;
            }
            else {
                return this.arctan(angle) + this.pi;
            }
        }
        else {
            if (y < 0) {
                return -this.halfpi;
            }
            else if (y > 0) {
                return this.halfpi;
            }
            else {
                return false;
            }
        }
    }
    static arctan2Vector2(vector2) {
        return this.arctan2(vector2.x, vector2.y);
    }
    static arctan(angle) {
        let loops = Trigonometry$1.arctanLoops[this.arctanDecimals];
        if (angle < 1 && angle > -1) {
            return this.taylorSerie(3, loops, angle, angle, false);
        }
        else {
            if (angle >= 1) {
                angle = 1 / angle;
                return -(this.taylorSerie(3, loops, angle, angle, false) - this.halfpi);
            }
            else {
                angle = -1 / angle;
                return this.taylorSerie(3, loops, angle, angle, false) - this.halfpi;
            }
        }
    }
    static sineEquation(amplitude, period, shiftX, shiftY) {
        return amplitude * this.sine(period + shiftX) + shiftY;
    }
    static cosineEquation(amplitude, period, shiftX, shiftY) {
        return amplitude * this.cosine(period + shiftX) + shiftY;
    }
    static arctanEquation(amplitude, period, shiftX, shiftY) {
        return amplitude * this.arctan(period + shiftX) + shiftY;
    }
    static taylorSerie(start, max, x, angle, needFactorial) {
        let squaredAngle = angle * angle;
        let result = x;
        let denominator = 0;
        let sign = -1;
        for (let i = 0; start <= max; start += 2, i++) {
            x *= squaredAngle;
            denominator = needFactorial ? this.factorialArray[start] : start;
            result += x / denominator * sign;
            sign = Utils$1.opposite(sign);
        }
        return result;
    }
}
Trigonometry$1.sineLoops = [
    9,
    11,
    13,
    15,
    17,
    18,
    19,
    21,
    23
];
Trigonometry$1.cosineLoops = [
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22
];
Trigonometry$1.arctanLoops = [
    17,
    19,
    21,
    23,
    25,
    27,
    29,
    31,
    33
];
Trigonometry$1.sineDecimals = 2;
Trigonometry$1.cosineDecimals = 2;
Trigonometry$1.arctanDecimals = 2;
Trigonometry$1.factorialArray = [];
Trigonometry$1.init();

class Time$1 {
    static millisecondToSecond(millisecond) {
        return millisecond * 0.001;
    }
    static secondToMilliecond(second) {
        return second * 1000;
    }
    static millisecondToFramePerSecond(millisecond) {
        return Math.round(1000 / millisecond);
    }
    static framePerSecondToMillisecond(refreshRate) {
        return Utils$1.round(1000 / refreshRate, 1);
    }
}

var Axis;
(function (Axis) {
    Axis["x"] = "x";
    Axis["y"] = "y";
})(Axis || (Axis = {}));

var Axis$1;
(function (Axis) {
    Axis["x"] = "x";
    Axis["y"] = "y";
    Axis["z"] = "z";
})(Axis$1 || (Axis$1 = {}));

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
* http://frameratjs.lcluber.com
*/

class Clock {
    constructor(refreshRate) {
        this.minimumTick = 16.7;
        this.minimumTick = refreshRate ? Time$1.framePerSecondToMillisecond(refreshRate) : this.minimumTick;
        this.reset();
    }
    reset() {
        this.now = 0;
        this.total = 0;
        this.delta = this.minimumTick;
        this.fps = 0;
        this.ticks = 0;
        this.sixteenLastFps = [];
    }
    start() {
        this.now = performance.now();
    }
    log() {
        if (this.total) {
            Logger.info('Elapsed time : ' + Utils$1.round(Time$1.millisecondToSecond(this.total), 2) + 'seconds');
            Logger.info('ticks : ' + this.ticks);
            Logger.info('Average FPS : ' + this.computeAverageFps());
        }
    }
    tick() {
        let now = performance.now();
        this.delta = now - this.now;
        if (this.delta >= this.minimumTick) {
            this.now = now;
            this.total += this.delta;
            this.ticks++;
            this.fps = Time$1.millisecondToFramePerSecond(this.delta);
            this.updateSixteenLastFps();
            return true;
        }
        return false;
    }
    computeAverageFps() {
        let totalFps = () => {
            let total = 0;
            for (let fps of this.sixteenLastFps) {
                total += fps;
            }
            return total;
        };
        return Utils$1.validate(Utils$1.round(totalFps() / this.sixteenLastFps.length, 2));
    }
    updateSixteenLastFps() {
        this.sixteenLastFps[this.ticks % 60] = this.fps;
    }
}

class Player {
    constructor(onAnimate, refreshRate) {
        this.frameId = 0;
        this.clock = new Clock(refreshRate);
        this.onAnimate = onAnimate;
        this.fsm = new FSM([
            { name: 'play', from: 'paused', to: 'running' },
            { name: 'pause', from: 'running', to: 'paused' }
        ]);
    }
    getDelta() {
        return Time$1.millisecondToSecond(this.clock.delta);
    }
    getTotal() {
        return Time$1.millisecondToSecond(this.clock.total);
    }
    getFPS() {
        return this.clock.computeAverageFps();
    }
    setScope(scope) {
        this.onAnimate = this.onAnimate.bind(scope);
    }
    play() {
        return this.startAnimation();
    }
    toggle() {
        return this.startAnimation() || this.stopAnimation();
    }
    stop() {
        this.clock.log();
        this.clock.reset();
        return this.stopAnimation();
    }
    requestNewFrame() {
        this.newFrame();
        return this.clock.tick();
    }
    startAnimation() {
        if ((this.fsm['play'])()) {
            this.clock.start();
            this.newFrame();
            return this.fsm.state;
        }
        return false;
    }
    stopAnimation() {
        if ((this.fsm['pause'])()) {
            window.cancelAnimationFrame(this.frameId);
        }
        return this.fsm.state;
    }
    newFrame() {
        this.frameId = window.requestAnimationFrame(this.onAnimate);
    }
}

class Progress {
    constructor(barId, textId) {
        this.rate = 0.0;
        this.total = 0;
        this.percentage = 0.0;
        this.target = 0;
        this.speed = 40;
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
                this.bar = percentBar ? new Binding(percentBar, 'style.width', '0px') : null;
                let number = bar.children[0];
                this.number = number ? new Binding(number, '', 0) : null;
                this.animation = new Player(this.animateBar, 0);
                this.animation.setScope(this);
            }
        }
        this.text = textId ? new Binding(textId, '', 'Loading') : null;
    }
    animateBar() {
        if (this.animation) {
            this.finished = this.updateBar(this.animation.getDelta());
            if (!this.finished) {
                this.animation.requestNewFrame();
            }
        }
    }
    start() {
        if (this.animation) {
            this.animation.play();
        }
    }
    update(text) {
        this.total++;
        this.rate = this.total / this.nbAssets;
        this.target = Math.round(this.rate * 100);
        if (this.text) {
            this.text.update(text);
        }
    }
    updateBar(delta) {
        this.percentage += this.speed * delta;
        let flooredPercentage = Utils.floor(this.percentage, 0);
        if (this.percentage >= this.target) {
            this.percentage = this.target;
        }
        if (this.bar) {
            this.bar.update(Utils.map(this.percentage, 0, 100, 0, this.barWidth) + 'px');
        }
        if (this.number) {
            this.number.update(flooredPercentage + '%');
        }
        if (flooredPercentage === 100) {
            if (this.animation) {
                this.animation.stop();
            }
            if (this.text) {
                this.text.update('Loading complete');
            }
            return true;
        }
        return false;
    }
}

class Loader {
    constructor(assets, assetsPath, progressBarId, progressTextId) {
        this.default = {
            maxPending: 6,
            tick: 100
        };
        this.validExtensions = {
            file: ['txt', 'text', 'json', 'glsl', 'babylon'],
            img: ['png', 'jpg', 'jpeg', 'gif'],
            sound: ['mp3', 'ogg', 'wav']
        };
        this.assets = assets;
        this.path = File.removeTrailingSlash(assetsPath);
        this.pendingRequests = 0;
        this.tick = this.default.tick;
        this.maxPendingRequests = this.default.maxPending;
        this.progress = new Progress(progressBarId, progressTextId);
        this.createAssets();
    }
    getAsset(name) {
        for (let property in this.assets) {
            if (this.assets.hasOwnProperty(property)) {
                for (let file of this.assets[property].files) {
                    if (file.name == name) {
                        return file;
                    }
                }
            }
        }
        return false;
    }
    getList(type) {
        if (this.assets.hasOwnProperty(type)) {
            return this.assets[type].files;
        }
        return false;
    }
    launch() {
        return new Promise((resolve, reject) => {
            if (this.progress.nbAssets) {
                this.progress.start();
                let intervalID = setInterval(() => {
                    this.sendRequest();
                    if (this.progress.finished) {
                        clearInterval(intervalID);
                        resolve();
                    }
                }, this.tick);
            }
            else {
                reject('!! nothing to load here');
            }
        });
    }
    getAssetType(extension) {
        for (let property in this.validExtensions) {
            if (this.validExtensions.hasOwnProperty(property)) {
                if (File.checkExtension(extension, this.validExtensions[property])) {
                    return property;
                }
            }
        }
        return false;
    }
    createAssets() {
        this.progress.nbAssets = 0;
        for (let property in this.assets) {
            if (this.assets.hasOwnProperty(property)) {
                let type = this.assets[property];
                let folder = type.folder ? type.folder + '/' : '';
                for (let file of type.files) {
                    if (!file.asset && file.hasOwnProperty('name')) {
                        let extension = File.getExtension(file.name);
                        if (extension) {
                            let type = this.getAssetType(extension);
                            if (type) {
                                file.asset = new Asset(this.path + '/' + folder, file.name, extension, type);
                                this.progress.nbAssets++;
                            }
                        }
                    }
                }
            }
        }
    }
    sendRequest() {
        if (this.pendingRequests < this.maxPendingRequests) {
            let nextAsset = this.getNextAssetToLoad();
            if (nextAsset) {
                nextAsset.sendRequest().then((response) => {
                    this.pendingRequests--;
                    this.progress.update(response);
                });
                return true;
            }
        }
        return false;
    }
    getNextAssetToLoad() {
        for (let property in this.assets) {
            if (this.assets.hasOwnProperty(property)) {
                let type = this.assets[property];
                for (let file of type.files) {
                    if (file.hasOwnProperty('asset') && !file.asset.isRequestSent()) {
                        return file.asset;
                    }
                }
            }
        }
        return false;
    }
}

export { Loader };
