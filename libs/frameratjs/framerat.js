/** Copyright (c) 2011 Ludovic Cluber.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute copies of the Software,
* and to permit persons to whom the Software is furnished to do so, 
* subject to the following conditions:
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
* http://www.frameratjs.lcluber.com
*/
var FRAMERAT = {
    revision: "0.2.1",
    id: null,
    onProgress: function() {},
    nbFrame: 0,
    fsm: {},
    clock: {},
    frame: function() {},
    create: function(onProgress) {
        var _this = Object.create(this);
        _this.onProgress = onProgress;
        _this.createFSM();
        _this.clock = FRAMERAT.Clock.create();
        return _this;
    },
    createFSM: function() {
        this.fsm = TAIPAN.create([ {
            name: "play",
            from: "paused",
            to: "running"
        }, {
            name: "stop",
            from: "running",
            to: "paused"
        } ]);
    },
    play: function(scope) {
        if (this.fsm.play()) {
            this.clock.start();
            this.requestNewFrame(scope);
        }
        return this.fsm.getStatus();
    },
    stop: function() {
        if (this.fsm.stop()) {
            this.cancelAnimation();
        }
        return this.fsm.getStatus();
    },
    reset: function() {
        this.stop();
        this.clock.reset();
        this.nbFrame = 0;
    },
    getTotalTime: function() {
        return this.clock.getTotal();
    },
    getDelta: function(unit) {
        return this.clock.getDelta(unit);
    },
    newFrame: function(scope) {
        this.requestNewFrame(scope);
        this.clock.tick();
        if (!this.nbFrame % 30) this.clock.getFramePerSecond();
    },
    requestNewFrame: function(scope) {
        this.frame = window.requestAnimationFrame(this.onProgress.bind(scope));
        this.nbFrame++;
    },
    cancelAnimation: function() {
        window.cancelAnimationFrame(this.frame);
    }
};

FRAMERAT.Clock = {
    revision: "0.1.0",
    target: {
        millisecond: 16,
        second: 16 * .001
    },
    old: performance.now(),
    "new": performance.now(),
    total: 0,
    fps: 0,
    delta: {
        millisecond: 0,
        second: 0
    },
    create: function() {
        var _this = Object.create(this);
        _this.init();
        return _this;
    },
    init: function() {
        this.total = 0;
        this.fps = 0;
        this.delta.second = this.target.second;
        this.delta.millisecond = this.target.millisecond;
    },
    start: function() {
        this.old = performance.now();
    },
    tick: function() {
        this.new = performance.now();
        this.computeDelta();
        this.old = this.new;
        this.delta.second = this.millisecondToSecond(this.delta.millisecond);
        this.total += this.delta.second;
    },
    getTotal: function() {
        return this.total;
    },
    getDelta: function(unit) {
        if (this.delta.hasOwnProperty(unit)) return this.delta[unit];
        return false;
    },
    computeDelta: function() {
        this.delta.millisecond = this.new - this.old;
        if (this.delta.millisecond < this.target.millisecond) this.delta.millisecond = this.target.millisecond;
    },
    getFramePerSecond: function() {
        this.fps = Math.round(1e3 / this.delta.millisecond);
    },
    millisecondToSecond: function(millisecond) {
        return millisecond * .001;
    }
};

(function() {
    if ("performance" in window === false) {
        window.performance = {};
    }
    Date.now = Date.now || function() {
        return new Date().getTime();
    };
    if ("now" in window.performance === false) {
        var nowOffset = Date.now();
        if (performance.timing && performance.timing.navigationStart) {
            nowOffset = performance.timing.navigationStart;
        }
        window.performance.now = function now() {
            return Date.now() - nowOffset;
        };
    }
})();

(function() {
    var lastTime = 0;
    var vendors = [ "ms", "moz", "webkit", "o" ];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
})();
/** Copyright (c) 2015 Ludovic Cluber.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute copies of the Software,
* and to permit persons to whom the Software is furnished to do so, 
* subject to the following conditions:
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
* http://www.taipanjs.com
*/
var TAIPAN = {
    revision: "0.2.0",
    create: function(config) {
        var _this = Object.create(this);
        _this.config = config;
        _this.status = TAIPAN.States.create(_this.config);
        _this.createEvents();
        return _this;
    },
    createEvents: function() {
        for (var i = 0; i < this.config.length; i++) {
            var event = this.config[i];
            if (!this.hasOwnProperty(event.name)) this[event.name] = this.setStatus(event.from, event.to);
        }
    },
    getStatus: function() {
        for (var property in this.status) if (this.status[property] === true) return property;
        return false;
    },
    setStatus: function(from, to) {
        return function() {
            if (this.status[from] === true) {
                this.status[from] = false;
                this.status[to] = true;
                return true;
            } else return false;
        };
    }
};

TAIPAN.States = {
    create: function(config) {
        var _this = Object.create(this);
        for (var i = 0; i < config.length; i++) {
            var event = config[i];
            if (!this.hasOwnProperty(event.from)) this[event.from] = i ? false : true;
            if (!this.hasOwnProperty(event.to)) this[event.to] = false;
        }
        return _this;
    }
};