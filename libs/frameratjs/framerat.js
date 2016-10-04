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
    revision: "0.2.0",
    id: null,
    onProgress: function() {},
    millisecond: 16,
    second: 16 * .001,
    oldTime: new Date().getTime(),
    newTime: new Date().getTime(),
    totalTime: 0,
    delta: 0,
    nbFrame: 0,
    fps: 0,
    fsm: {},
    frame: function() {},
    create: function(onProgress) {
        var _this = Object.create(this);
        _this.onProgress = onProgress;
        _this.createFSM();
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
            this.oldTime = new Date().getTime();
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
        this.nbFrame = 0;
        this.totalTime = 0;
        this.second = this.millisecond * .001;
        this.fps = 0;
    },
    getTotalTime: function() {
        return this.totalTime;
    },
    newFrame: function(scope) {
        this.requestNewFrame(scope);
        this.newTime = new Date().getTime();
        this.computeDelta();
        this.oldTime = this.newTime;
        this.second = this.delta * .001;
        this.totalTime += this.second;
        this.computeFPS();
    },
    requestNewFrame: function(scope) {
        this.frame = window.requestAnimationFrame(this.onProgress.bind(scope));
        this.nbFrame++;
    },
    cancelAnimation: function() {
        window.cancelAnimationFrame(this.frame);
    },
    computeDelta: function() {
        this.delta = this.newTime - this.oldTime;
        if (this.delta < this.millisecond) this.delta = this.millisecond;
    },
    computeFPS: function() {
        if (!this.nbFrame % 30) this.fps = Math.round(1e3 / this.delta);
    }
};

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