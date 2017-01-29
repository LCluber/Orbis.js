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
var ORBIS = {
    revision: "0.4.6",
    assets: {},
    assetsPath: "",
    requests: {},
    requestsLength: 0,
    sentRequests: 0,
    onProgress: function() {},
    onComplete: function() {},
    progress: {},
    pending: 0,
    tick: 0,
    maxPending: 0,
    defaultMaxPending: 6,
    defaultTick: 100,
    logs: {},
    create: function(onProgress, onAnimate, onComplete, tick, maxPending) {
        var _this = Object.create(this);
        _this.logs = ORBIS.Logger.create();
        _this.logs.init();
        if (ORBIS.Utils.isFunction(onProgress)) _this.onProgress = onProgress; else _this.logs.add("onProgress parameter is not a function");
        if (ORBIS.Utils.isFunction(onComplete)) _this.onComplete = onComplete; else _this.logs.add("onComplete parameter is not a function");
        _this.progress = ORBIS.Progress.create(onAnimate);
        _this.setTick(tick);
        _this.setMaxPending(maxPending);
        return _this;
    },
    launch: function(assetsFilePath, assetsPath) {
        this.progress.init();
        this.assetsPath = ORBIS.Utils.removeTrailingSlash(assetsPath);
        if (this.assets.fsm && this.assets.fsm.getStatus() === "success") {
            this.logs.add(assetsFilePath + " already loaded.");
            this.onAssetsFileLoaded("success", this.assets.response, this);
        } else {
            this.logs.add("create request for " + assetsFilePath);
            this.assets = ORBIS.Request.create(assetsFilePath, "file", "", this.onAssetsFileLoaded, this);
            if (this.assets) this.assets.send(); else this.logs.add('!! the config file must be of type "file"');
        }
    },
    onAssetsFileLoaded: function(status, response, _this) {
        if (status == "success") {
            _this.logs.add("parsing asset file");
            _this.requestsLength = 0;
            _this.sentRequests = 0;
            for (var property in response.json) {
                if (response.json.hasOwnProperty(property)) {
                    var type = response.json[property];
                    var files = type.files;
                    var folder = type.folder ? type.folder + "/" : "";
                    for (var i = 0; i < files.length; i++) {
                        var asset = files[i];
                        var file = asset.hasOwnProperty("file") ? asset.file : asset;
                        var path = _this.assetsPath + "/" + folder + file;
                        if (_this.getAsset(file)) {
                            _this.logs.add(path + " already loaded.");
                            continue;
                        }
                        var request = ORBIS.Request.create(path, "", asset, _this.onFileLoaded, _this);
                        if (typeof request.file === "string") {
                            _this.logs.add(request.file);
                            continue;
                        }
                        _this.logs.add("create request for " + path);
                        _this.requests[file] = request;
                        _this.requestsLength++;
                    }
                }
            }
            _this.logs.add(_this.requestsLength + " requests to perform");
            _this.sendRequest();
        } else _this.logs.add("!! error during config file AJAX request");
    },
    sendRequest: function() {
        if (this.pending < this.maxPending) {
            var nextProperty = Object.keys(this.requests)[this.sentRequests];
            if (this.getAsset(nextProperty) || this.requests[nextProperty].send() == "error") this.updateProgress(0, this.getAsset(nextProperty).response);
            this.pending++;
            this.sentRequests++;
        }
        if (this.sentRequests < this.requestsLength) {
            setTimeout(this.loadAnotherFile.bind(this), this.tick);
        }
    },
    loadAnotherFile: function() {
        this.sendRequest();
    },
    onFileLoaded: function(success, response, _this) {
        _this.updateProgress(success, response);
    },
    updateProgress: function(success, response) {
        var progress = this.progress.update(success, this.requestsLength);
        if (this.pending > 0) this.pending--;
        this.logs.add("progress " + this.progress.target + "%");
        this.onProgress(this.progress.target, response);
        if (!progress) {
            this.logs.add("loading complete");
            this.onComplete(this.getLogs());
        }
    },
    getList: function(property) {
        if (this.assets.response.json.hasOwnProperty(property)) {
            var array = [];
            var assets = this.assets.response.json[property].files;
            for (var i = 0; i < assets.length; i++) {
                var asset = this.getAsset(assets[i]);
                if (asset) array.push(asset);
            }
            return array;
        }
        return false;
    },
    getAsset: function(name) {
        if (this.requests[name] && this.requests[name].fsm.getStatus() === "success") return this.requests[name]; else return false;
    },
    setScope: function(scope) {
        if (ORBIS.Utils.isObject(scope)) {
            this.onProgress = this.onProgress.bind(scope);
            this.progress.onAnimate = this.progress.onAnimate.bind(scope);
            this.onComplete = this.onComplete.bind(scope);
        } else return false;
    },
    getTick: function() {
        return this.tick;
    },
    setTick: function(tick) {
        this.tick = ORBIS.Utils.valueValidation(tick) ? ORBIS.Utils.valueValidation(tick) : this.defaultTick;
    },
    getMaxPending: function() {
        return this.maxPending;
    },
    setMaxPending: function(max) {
        this.maxPending = ORBIS.Utils.valueValidation(max) ? ORBIS.Utils.valueValidation(max) : this.defaultMaxPending;
    },
    getLogs: function() {
        return this.logs.get();
    },
    setProgressSpeed: function(speed) {
        this.progress.speed = ORBIS.Utils.clamp(ORBIS.Utils.valueValidation(speed), 10, 100);
        return this.progress.speed;
    }
};

ORBIS.Logger = {
    logs: "",
    create: function() {
        var _this = Object.create(this);
        return _this;
    },
    init: function() {
        this.logs = "";
    },
    get: function() {
        return this.logs;
    },
    add: function(log) {
        this.logs += log + "\n";
    }
};

ORBIS.File = {
    path: "",
    directory: "",
    name: "",
    extension: "",
    type: "",
    extensions: {
        file: [ "txt", "text", "json", "babylon" ],
        image: [ "png", "jpg", "jpeg", "gif" ],
        sound: [ "mp3", "ogg", "wav" ]
    },
    create: function(path, validType) {
        var _this = Object.create(this);
        _this.path = path;
        _this.extractExtension();
        var isExtensionValid = _this.checkExtension(validType);
        if (isExtensionValid === true) {
            _this.extractDirectory();
            _this.extractName();
            return _this;
        }
        return isExtensionValid;
    },
    getPath: function() {
        return this.path;
    },
    getName: function() {
        return this.name;
    },
    getExtension: function() {
        return this.extension;
    },
    getType: function() {
        return this.type;
    },
    extractName: function() {
        this.name = this.path ? this.path.replace(/^.*[\\\/]/, "") : false;
    },
    extractDirectory: function() {
        this.directory = this.path ? this.path.replace(/[^\\\/]*$/, "") : false;
    },
    extractExtension: function() {
        this.extension = this.path ? this.path.split(".").pop() : false;
    },
    checkExtension: function(validType) {
        for (var property in this.extensions) {
            if (this.extensions.hasOwnProperty(property)) {
                if (!validType || validType == property) {
                    for (var i = 0; i < this.extensions[property].length; i++) {
                        if (this.extensions[property][i] == this.extension) {
                            this.type = property;
                            return true;
                        }
                    }
                }
            }
        }
        return 'Invalid file extension for "' + this.path + '"';
    }
};

ORBIS.AjaxRequest = function(url, async, noCache, callback) {
    var http = new XMLHttpRequest();
    if (noCache) url += "?cache=" + new Date().getTime();
    http.open("GET", url, async);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) callback(this.responseText);
    };
    http.send();
};

ORBIS.Utils = {
    getFileName: function(path) {
        return path ? path.replace(/^.*[\\\/]/, "") : false;
    },
    removeTrailingSlash: function(path) {
        return path ? path.replace(/\/+$/, "") : false;
    },
    valueValidation: function(value) {
        return isNaN(value) ? 0 : Math.abs(Math.round(value));
    },
    clamp: function(x, min, max) {
        return Math.min(Math.max(x, min), max);
    },
    isJSON: function(str) {
        var json = str.replace(/(\r\n|\n|\r|\t)/gm, "");
        try {
            json = JSON.parse(str);
        } catch (e) {
            return false;
        }
        return json;
    },
    isFunction: function(func) {
        var getType = {};
        return func && getType.toString.call(func) === "[object Function]";
    },
    isObject: function(object) {
        return object !== null && (this.isFunction(object) || typeof object === "object");
    }
};

ORBIS.LoadImage = function(path, onComplete, _this) {
    var img = new Image();
    img.src = path;
    img.name = ORBIS.Utils.getFileName(path);
    img.addEventListener("load", function() {
        onComplete(1, _this);
    }, false);
    img.addEventListener("error", function() {
        onComplete(0, _this);
    }, false);
    return img;
};

ORBIS.LoadSound = function(path, onComplete, _this) {
    var snd = new Audio();
    snd.src = path;
    snd.name = ORBIS.Utils.getFileName(path);
    snd.addEventListener("canplaythrough", function() {
        onComplete(1, _this);
    }, false);
    snd.addEventListener("canplay", function() {
        onComplete(1, _this);
    }, false);
    snd.addEventListener("error", function failed() {
        onComplete(0, _this);
    }, false);
    return snd;
};

ORBIS.LoadFile = function(path, onComplete, _this) {
    var resp = {};
    resp.src = path;
    resp.name = ORBIS.Utils.getFileName(path);
    resp.data = "";
    resp.json = "";
    ORBIS.AjaxRequest(path, true, 1, function(response) {
        if (response) {
            resp.data = response;
            resp.json = ORBIS.Utils.isJSON(response);
        }
        onComplete(response ? 1 : 0, _this);
    });
    return resp;
};

ORBIS.Progress = {
    rate: 0,
    percentage: 0,
    target: 0,
    speed: 40,
    success: 0,
    error: 0,
    total: 0,
    animation: {},
    onAnimate: function() {},
    create: function(onAnimate) {
        var _this = Object.create(this);
        _this.animation = FRAMERAT.create(_this.animate, _this);
        if (ORBIS.Utils.isFunction(onAnimate)) _this.onAnimate = onAnimate;
        return _this;
    },
    init: function() {
        this.rate = 0;
        this.percentage = 0;
        this.target = 0;
        this.success = 0;
        this.error = 0;
        this.total = 0;
    },
    update: function(success, totalRequests) {
        if (success) this.onSuccess(); else this.onError();
        this.total++;
        this.rate = totalRequests ? this.total / totalRequests : 1;
        this.target = Math.round(this.rate * 100);
        this.animation.play();
        return this.checkComplete();
    },
    animate: function() {
        this.percentage += this.speed * this.animation.getDelta();
        if (this.percentage >= this.target) {
            this.percentage = this.target;
            this.animation.stop();
        } else this.animation.newFrame();
        this.onAnimate(this.percentage);
    },
    onSuccess: function() {
        this.success++;
    },
    onError: function() {
        this.error++;
    },
    checkComplete: function() {
        if (this.rate >= 1) return false;
        return true;
    }
};

ORBIS.Request = {
    file: {},
    response: {},
    fsm: {},
    callback: {
        method: function() {},
        scope: {}
    },
    json: {},
    loaders: {
        file: "LoadFile",
        image: "LoadImage",
        sound: "LoadSound"
    },
    logs: {},
    create: function(filePath, validType, additionalInfo, callbackMethod, callbackScope) {
        var _this = Object.create(this);
        _this.logs = callbackScope.logs;
        _this.createFile(filePath, validType);
        if (typeof this.file === "string") {
            return this.file;
        }
        _this.createCallback(callbackMethod, callbackScope);
        _this.createFSM();
        _this.addInfo(additionalInfo);
        return _this;
    },
    createFile: function(filePath, validType) {
        this.file = ORBIS.File.create(filePath, validType);
    },
    createCallback: function(callbackMethod, callbackScope) {
        this.callback = {};
        this.callback.method = callbackMethod;
        this.callback.scope = callbackScope;
    },
    createFSM: function() {
        this.fsm = TAIPAN.create([ {
            name: "send",
            from: "idle",
            to: "pending"
        }, {
            name: "success",
            from: "pending",
            to: "success"
        }, {
            name: "error",
            from: "pending",
            to: "error"
        } ]);
    },
    addInfo: function(additionalInfo) {
        if (additionalInfo.hasOwnProperty("file")) {
            this.json = {};
            for (var property in additionalInfo) {
                if (additionalInfo.hasOwnProperty(property) && property !== "file") this.json[property] = additionalInfo[property];
            }
        }
    },
    send: function() {
        this.logs.add("send " + this.file.getName() + ", Status " + this.fsm.getStatus());
        this.fsm.send();
        if (this.file.getType()) this.response = ORBIS[this.loaders[this.file.getType()]](this.file.path, this.onComplete, this); else {
            this.fsm.error();
            this.logs.add("!! invalid file type. Cannot load " + this.file.path + ". Status " + this.fsm.getStatus());
        }
        return this.fsm.getStatus();
    },
    onComplete: function(success, _this) {
        var event = false;
        if (success) event = _this.fsm.success(); else {
            event = _this.fsm.error();
            _this.logs.add("!! error during AJAX request for : " + _this.file.path + ".");
        }
        if (event) {
            _this.logs.add("complete " + _this.file.getName() + ". Status " + _this.fsm.getStatus());
            _this.callback.method(_this.fsm.getStatus(), _this.response, _this.callback.scope);
        }
    }
};
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
var FRAMERAT = {
    revision: "0.2.5",
    id: null,
    onAnimate: function() {},
    tickCount: 0,
    fsm: {},
    clock: {},
    frameId: 0,
    options: {
        refreshRate: 30
    },
    console: {},
    formated: {
        delta: 0
    },
    create: function(onAnimate, scope) {
        var _this = Object.create(this);
        _this.createOnAnimateCallback(onAnimate, scope);
        _this.createFiniteStateMachine();
        _this.createConsole();
        _this.clock = FRAMERAT.Clock.create();
        return _this;
    },
    createOnAnimateCallback: function(onAnimate, scope) {
        if (!scope) this.onAnimate = onAnimate; else this.onAnimate = onAnimate.bind(scope);
    },
    createConsole: function() {
        this.console = FRAMERAT.Console.create(TYPE6.Vector2D.create(), TYPE6.Vector2D.create(20, 20));
        this.console.addLine("Elapsed time : {0}", this.getFormatedTotalTime, this);
        this.console.addLine("Frame count : {0}", this.getFrameNumber, this);
        this.console.addLine("Frame Per Second : {0}", this.getFramePerSecond, this);
        this.console.addLine("Frame duration : {0}", this.getFormatedDelta, this);
        this.toggleConsole();
    },
    createFiniteStateMachine: function() {
        this.fsm = TAIPAN.create([ {
            name: "play",
            from: "paused",
            to: "running"
        }, {
            name: "pause",
            from: "running",
            to: "paused"
        } ]);
    },
    play: function() {
        if (this.fsm.play()) {
            this.clock.start();
            this.requestNewFrame();
            return true;
        }
        return false;
    },
    pause: function() {
        if (this.fsm.pause()) {
            this.cancelAnimation();
            return true;
        }
        return false;
    },
    toggle: function() {
        if (!this.play()) this.pause();
        return this.fsm.getStatus();
    },
    stop: function() {
        if (this.pause()) {
            this.clock.init();
            this.tickCount = 0;
            return true;
        }
        return false;
    },
    getTotalTime: function() {
        return this.clock.getTotal();
    },
    getFormatedTotalTime: function() {
        return TYPE6.MathUtils.round(this.millisecondToSecond(this.getTotalTime()), 2);
    },
    getDelta: function() {
        return this.millisecondToSecond(this.clock.getDelta());
    },
    getFormatedDelta: function() {
        if (this.tickCount % this.options.refreshRate === 0) this.formated.delta = TYPE6.MathUtils.round(this.getDelta(), 5);
        return this.formated.delta;
    },
    getFrameNumber: function() {
        return this.tickCount;
    },
    getFramePerSecond: function() {
        if (this.tickCount % this.options.refreshRate === 0) this.clock.computeFramePerSecond();
        return this.clock.getFramePerSecond();
    },
    newFrame: function() {
        this.requestNewFrame();
        this.clock.tick();
    },
    requestNewFrame: function() {
        this.frameId = window.requestAnimationFrame(this.onAnimate);
        this.tickCount++;
    },
    cancelAnimation: function() {
        window.cancelAnimationFrame(this.frameId);
    },
    millisecondToSecond: function(millisecond) {
        return millisecond * .001;
    },
    drawConsole: function(context) {
        this.console.draw(context);
    },
    toggleConsole: function() {
        this.console.toggle();
    }
};

FRAMERAT.Console = {
    fontFamily: "Georgia",
    fontSize: 20,
    fontColor: "rgba(60, 60, 60, 1)",
    font: "",
    position: null,
    padding: null,
    color: null,
    lineHeight: 30,
    lines: [],
    nbLines: 0,
    show: false,
    create: function(position, padding) {
        var _this = Object.create(this);
        _this.position = position;
        _this.padding = padding;
        _this.lines = [];
        _this.setFont(_this.fontSize, _this.fontFamily);
        return _this;
    },
    setFont: function(fontSize, fontFamily) {
        this.font = fontSize + "px " + fontFamily;
    },
    setFontColor: function(r, g, b, a) {
        this.fontColor = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    },
    addLine: function(text, callback, scope) {
        var positionY = this.lineHeight;
        var positionX = this.padding.getX();
        if (this.nbLines) positionY += this.lines[this.nbLines - 1].position.getY(); else positionY += this.padding.getY();
        this.nbLines++;
        var line = this.Line.create(TYPE6.Vector2D.create(positionX, positionY), text, callback, scope);
        this.lines.push(line);
    },
    draw: function(context) {
        if (this.show) {
            context.font = this.font;
            context.fillStyle = this.fontColor;
            for (var i = 0; i < this.nbLines; i++) {
                var line = this.lines[i];
                this.write(line.text.replace("{0}", line.callback), line.position, context);
            }
        }
    },
    write: function(text, position, context) {
        context.fillText(text, position.getX(), position.getY());
    },
    toggle: function() {
        this.show = this.show ? false : true;
    }
};

FRAMERAT.Console.Line = {
    position: null,
    callback: null,
    text: "",
    create: function(position, text, callback, scope) {
        var _this = Object.create(this);
        _this.position = position;
        _this.callback = callback.bind(scope);
        _this.text = text;
        return _this;
    }
};

FRAMERAT.Clock = {
    old: performance.now(),
    "new": performance.now(),
    fps: 0,
    minimumTick: 16,
    total: 0,
    delta: 0,
    create: function() {
        var _this = Object.create(this);
        _this.init();
        return _this;
    },
    init: function() {
        this.fps = 0;
        this.total = 0;
        this.delta = Math.max(0, this.minimumTick);
    },
    start: function() {
        this.old = performance.now();
    },
    tick: function() {
        this.new = performance.now();
        this.delta = Math.max(this.new - this.old, this.minimumTick);
        this.old = this.new;
        this.total += this.delta;
    },
    getTotal: function() {
        return this.total;
    },
    getDelta: function() {
        return this.delta;
    },
    computeFramePerSecond: function() {
        this.fps = Math.round(1e3 / this.delta);
    },
    getFramePerSecond: function() {
        return this.fps;
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
var TYPE6 = {
    Revision: "0.2.3"
};

TYPE6.MathUtils = {
    round: function(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.round(x * decimals) / decimals;
    },
    floor: function(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.floor(x * decimals) / decimals;
    },
    ceil: function(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.ceil(x * decimals) / decimals;
    },
    trunc: function(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.trunc(x * decimals) / decimals;
    },
    roundToNearest: function(value, nearest) {
        return Math.round(value / nearest) * nearest;
    },
    isEven: function(x) {
        return !(x & 1);
    },
    isOdd: function(x) {
        return x & 1;
    },
    mix: function(x, y, ratio) {
        return (1 - ratio) * x + ratio * y;
    },
    getSign: function(x) {
        return x ? x < 0 ? -1 : 1 : 0;
    },
    getOppositeSign: function(x) {
        return -x;
    },
    clamp: function(x, min, max) {
        return Math.min(Math.max(x, min), max);
    },
    normalize: function(x, min, max) {
        return (x - min) / (max - min);
    },
    lerp: function(normal, min, max) {
        return (max - min) * normal + min;
    },
    map: function(x, sourceMin, sourceMax, destMin, destMax) {
        return this.lerp(this.normalize(x, sourceMin, sourceMax), destMin, destMax);
    }
};

TYPE6.Random = {
    "float": function(min, max) {
        return min + Math.random() * (max - min);
    },
    integer: function(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    },
    distribution: function(min, max, iterations) {
        var total = 0;
        for (var i = 0; i < iterations; i++) {
            total += this.float(min, max);
        }
        return total / iterations;
    },
    pick: function(value1, value2) {
        return Math.random() < .5 ? value1 : value2;
    }
};

TYPE6.Bezier = {
    quadratic: function(p0x, p1x, p2x, t, tt, oneMinusT, powerOf2, oneMinusTByTwo2ByT) {
        return powerOf2 * p0x + oneMinusTByTwo2ByT * p1x + tt * p2x;
    },
    cubic: function(p0x, p1x, p2x, p3x, t, tt, oneMinusT) {
        return Math.pow(oneMinusT, 3) * p0x + Math.pow(oneMinusT, 2) * 3 * t * p1x + oneMinusT * 3 * tt * p2x + tt * t * p3x;
    }
};

TYPE6.Vector2D = {
    x: 0,
    y: 0,
    create: function(x, y) {
        var _this = Object.create(this);
        _this.setX(x);
        _this.setY(y);
        return _this;
    },
    createFromArray: function(array) {
        var _this = Object.create(this);
        _this.setX(array[0]);
        _this.setY(array[1]);
        return _this;
    },
    toArray: function() {
        return [ this.x, this.y ];
    },
    toString: function() {
        return "(" + this.x + ";" + this.y + ")";
    },
    setX: function(value) {
        this.x = this.valueValidation(value);
        return this.x;
    },
    getX: function() {
        return this.x;
    },
    setY: function(value) {
        this.y = this.valueValidation(value);
        return this.y;
    },
    getY: function() {
        return this.y;
    },
    set: function(property, value) {
        if (this.hasOwnProperty(property)) {
            this[property] = this.valueValidation(value);
            return this[property];
        }
        return false;
    },
    get: function(property) {
        if (this.hasOwnProperty(property)) {
            return this[property];
        }
        return false;
    },
    setXY: function(x, y) {
        this.x = this.valueValidation(x);
        this.y = this.valueValidation(y);
    },
    setToOrigin: function() {
        this.x = 0;
        this.y = 0;
    },
    setXToOrigin: function() {
        this.x = 0;
    },
    setYToOrigin: function() {
        this.y = 0;
    },
    setAngle: function(angle) {
        if (this.valueValidation(angle)) {
            var length = this.getMagnitude();
            this.x = TYPE6.Trigonometry.cosinus(angle) * length;
            this.y = TYPE6.Trigonometry.sinus(angle) * length;
            return true;
        }
        return false;
    },
    getAngle: function() {
        return Math.atan2(this.y, this.x);
    },
    setMagnitude: function(length) {
        if (this.valueValidation(length)) {
            var angle = this.getAngle();
            this.x = TYPE6.Trigonometry.cosinus(angle) * length;
            this.y = TYPE6.Trigonometry.sinus(angle) * length;
            return true;
        }
        return false;
    },
    getMagnitude: function() {
        return Math.sqrt(this.getSquaredMagnitude());
    },
    getSquaredMagnitude: function() {
        return this.x * this.x + this.y * this.y;
    },
    getDistance: function(vector2D) {
        this.subtractFrom(vector2D);
        var magnitude = this.getMagnitude();
        this.addTo(vector2D);
        return magnitude;
    },
    getSquaredDistance: function(vector2D) {
        this.subtractFrom(vector2D);
        var squaredMagnitude = this.getSquaredMagnitude();
        this.addTo(vector2D);
        return squaredMagnitude;
    },
    copy: function() {
        return this.create(this.getX(), this.getY());
    },
    add: function(vector2D) {
        return this.create(this.x + vector2D.getX(), this.y + vector2D.getY());
    },
    addX: function(x) {
        return this.create(this.x + x, this.y);
    },
    addY: function(y) {
        return this.create(this.x, this.y + y);
    },
    addScalar: function(scalar) {
        return this.create(this.x + scalar, this.y + scalar);
    },
    addScaledVector: function(vector2D, scalar) {
        return this.create(this.x + vector2D.getX() * scalar, this.y + vector2D.getY() * scalar);
    },
    subtract: function(vector2D) {
        return this.create(this.x - vector2D.getX(), this.y - vector2D.getY());
    },
    subtractScalar: function(scalar) {
        return this.create(this.x - scalar, this.y - scalar);
    },
    subtractScaledVector: function(vector2D, scalar) {
        return this.create(this.x - vector2D.getX() * scalar, this.y - vector2D.getY() * scalar);
    },
    scale: function(value) {
        return this.create(this.x * value, this.y * value);
    },
    multiply: function(vector2D) {
        return this.create(this.x * vector2D.getX(), this.y * vector2D.getY());
    },
    divide: function(vector2D) {
        return this.create(this.x / vector2D.getX(), this.y / vector2D.getY());
    },
    halve: function() {
        return this.create(this.x * .5, this.y * .5);
    },
    normalize: function() {
        var length = this.getMagnitude();
        if (length) {
            return this.scale(1 / length);
        }
    },
    absolute: function() {
        return this.create(Math.abs(this.x), Math.abs(this.y));
    },
    opposite: function() {
        return this.create(-this.x, -this.y);
    },
    oppositeX: function() {
        return this.create(-this.x, this.y);
    },
    oppositeY: function() {
        return this.create(this.x, -this.y);
    },
    clamp: function(rectangle) {
        return this.create(TYPE6.MathUtils.clamp(this.x, rectangle.topLeftCorner.getX(), rectangle.bottomRightCorner.getX()), TYPE6.MathUtils.clamp(this.y, rectangle.topLeftCorner.getY(), rectangle.bottomRightCorner.getY()));
    },
    lerp: function(normal, min, max) {
        return this.create(TYPE6.MathUtils.lerp(normal, min.getX(), max.getX()), TYPE6.MathUtils.lerp(normal, min.getY(), max.getY()));
    },
    quadraticBezier: function(p0, p1, p2, t) {
        var tt = t * t;
        var oneMinusT = 1 - t;
        var powerOf2 = Math.pow(oneMinusT, 2);
        var oneMinusTByTwo2ByT = oneMinusT * 2 * t;
        return this.create(TYPE6.Bezier.quadratic(p0.getX(), p1.getX(), p2.getX(), t, tt, oneMinusT, powerOf2, oneMinusTByTwo2ByT), TYPE6.Bezier.quadratic(p0.getY(), p1.getY(), p2.getY(), t, tt, oneMinusT, powerOf2, oneMinusTByTwo2ByT));
    },
    cubicBezier: function(p0, p1, p2, p3, t) {
        var tt = t * t;
        var oneMinusT = 1 - t;
        return this.create(TYPE6.Bezier.cubic(p0.getX(), p1.getX(), p2.getX(), p3.getX(), t, tt, oneMinusT), TYPE6.Bezier.cubic(p0.getY(), p1.getY(), p2.getY(), p3.getY(), t, tt, oneMinusT));
    },
    quadraticBezierTo: function(p0, p1, p2, t) {
        var tt = t * t;
        var oneMinusT = 1 - t;
        var powerOf2 = Math.pow(oneMinusT, 2);
        var oneMinusTByTwo2ByT = oneMinusT * 2 * t;
        this.x = TYPE6.Bezier.quadratic(p0.getX(), p1.getX(), p2.getX(), t, tt, oneMinusT, powerOf2, oneMinusTByTwo2ByT);
        this.y = TYPE6.Bezier.quadratic(p0.getY(), p1.getY(), p2.getY(), t, tt, oneMinusT, powerOf2, oneMinusTByTwo2ByT);
    },
    cubicBezierTo: function(p0, p1, p2, p3, t) {
        var tt = t * t;
        var oneMinusT = 1 - t;
        this.x = TYPE6.Bezier.cubic(p0.getX(), p1.getX(), p2.getX(), p3.getX(), t, tt, oneMinusT);
        this.y = TYPE6.Bezier.cubic(p0.getY(), p1.getY(), p2.getY(), p3.getY(), t, tt, oneMinusT);
    },
    copyTo: function(vector2D) {
        this.x = vector2D.getX();
        this.y = vector2D.getY();
    },
    addTo: function(vector2D) {
        this.x += vector2D.getX();
        this.y += vector2D.getY();
    },
    addToX: function(x) {
        this.x += x;
    },
    addToY: function(y) {
        this.y += y;
    },
    addScalarTo: function(scalar) {
        this.x += scalar;
        this.y += scalar;
    },
    addScaledVectorTo: function(vector2D, scalar) {
        this.x += vector2D.getX() * scalar;
        this.y += vector2D.getY() * scalar;
    },
    copyScaledVectorTo: function(vector2D, scalar) {
        this.x = vector2D.getX() * scalar;
        this.y = vector2D.getY() * scalar;
    },
    subtractFrom: function(vector2D) {
        this.x -= vector2D.getX();
        this.y -= vector2D.getY();
    },
    copySubtractFromTo: function(vector2DA, vector2DB) {
        this.x = vector2DA.getX() - vector2DB.getX();
        this.y = vector2DA.getY() - vector2DB.getY();
    },
    subtractScalarFrom: function(scalar) {
        this.x -= scalar;
        this.y -= scalar;
    },
    subtractScaledVectorFrom: function(vector2D, scalar) {
        this.x -= vector2D.getX() * scalar;
        this.y -= vector2D.getY() * scalar;
    },
    scaleBy: function(value) {
        this.x *= value;
        this.y *= value;
    },
    multiplyBy: function(vector2D) {
        this.x *= vector2D.getX();
        this.y *= vector2D.getY();
    },
    divideBy: function(vector2D) {
        this.x /= vector2D.getX();
        this.y /= vector2D.getY();
    },
    halveBy: function() {
        this.x *= .5;
        this.y *= .5;
    },
    normalizeTo: function() {
        var length = this.getMagnitude();
        if (length) {
            this.scaleBy(1 / length);
        }
    },
    absoluteTo: function() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
    },
    oppositeTo: function() {
        this.x = -this.x;
        this.y = -this.y;
    },
    oppositeXTo: function() {
        this.x = -this.x;
    },
    oppositeYTo: function() {
        this.y = -this.y;
    },
    clampTo: function(rectangle) {
        this.x = TYPE6.MathUtils.clamp(this.x, rectangle.topLeftCorner.getX(), rectangle.bottomRightCorner.getX());
        this.y = TYPE6.MathUtils.clamp(this.y, rectangle.topLeftCorner.getY(), rectangle.bottomRightCorner.getY());
    },
    lerpTo: function(normal, min, max) {
        this.x = TYPE6.MathUtils.lerp(normal, min.getX(), max.getX());
        this.y = TYPE6.MathUtils.lerp(normal, min.getY(), max.getY());
    },
    dotProduct: function(vector2D) {
        return this.x * vector2D.getX() + this.y * vector2D.getY();
    },
    isOrigin: function() {
        if (this.x === 0 || this.y === 0) return true;
        return false;
    },
    isPositive: function() {
        if (this.getX() > 0 && this.getY() > 0) return true;
        return false;
    },
    isNegative: function() {
        if (this.getX() < 0 && this.getY() < 0) return true;
        return false;
    },
    isNotOrigin: function() {
        if (this.x || this.y) {
            return true;
        }
        return false;
    },
    valueValidation: function(value) {
        return isNaN(value) ? 0 : value;
    }
};

TYPE6.Geometry = {};

TYPE6.Geometry.Circle = {
    position: {},
    radius: 0,
    diameter: 0,
    shape: "circle",
    size: {},
    halfSize: {},
    create: function(positionX, positionY, radius) {
        var obj = Object.create(this);
        obj.init();
        obj.setRadius(radius);
        obj.initSize();
        obj.setPositionXY(positionX, positionY);
        return obj;
    },
    init: function() {
        this.position = TYPE6.Vector2D.create();
        this.radius = 0;
        this.diameter = 0;
    },
    initSize: function() {
        this.size = TYPE6.Vector2D.create(this.diameter, this.diameter);
        this.halfSize = TYPE6.Vector2D.create(this.radius, this.radius);
    },
    copy: function(circle) {
        return this.create(circle.getPositionX(), circle.getPositionY(), circle.getRadius());
    },
    copyTo: function(circle) {
        this.setPositionFromVector2D(circle.getPosition());
        this.setRadius(circle.getRadius());
    },
    setPositionX: function(x) {
        this.position.setX(x);
        return this.position.getX();
    },
    setPositionY: function(y) {
        this.position.setY(y);
        return this.position.getY();
    },
    setPositionXY: function(positionX, positionY) {
        this.position.setXY(positionX, positionY);
        return this.position;
    },
    setPositionFromVector2D: function(position) {
        this.position.copyTo(position);
        return this.position;
    },
    getPosition: function() {
        return this.position;
    },
    getPositionX: function() {
        return this.position.getX();
    },
    getPositionY: function() {
        return this.position.getY();
    },
    setRadius: function(radius) {
        this.radius = radius;
        this.diameter = this.radius * 2;
        this.initSize();
        return this.radius;
    },
    getRadius: function() {
        return this.radius;
    },
    setDiameter: function(diameter) {
        this.diameter = diameter;
        this.radius = this.diameter * .5;
        this.initSize();
        return this.diameter;
    },
    getDiameter: function() {
        return this.diameter;
    },
    getHalfSize: function() {
        return this.halfSize;
    },
    clampTo: function(rectangle) {
        this.position.clampTo(rectangle);
    },
    scale: function(scalar) {
        return this.create(this.position.getX(), this.position.getY(), this.radius * scalar);
    },
    scaleBy: function(scalar) {
        this.setRadius(this.radius * scalar);
        return this.radius;
    },
    getDistance: function(vector2) {
        return this.position.getDistance(vector2);
    },
    getSquaredDistance: function(vector2) {
        return this.position.getSquaredDistance(vector2);
    },
    draw: function(context, color) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(this.getPositionX(), this.getPositionY(), this.getRadius(), 0, TYPE6.Trigonometry.TWOPI, false);
        context.fill();
    }
};

TYPE6.Geometry.Rectangle = {
    position: {},
    topLeftCorner: {},
    bottomRightCorner: {},
    size: {},
    halfSize: {},
    shape: "aabb",
    create: function(positionX, positionY, sizeX, sizeY) {
        var obj = Object.create(this);
        obj.initSize(sizeX, sizeY);
        obj.initPosition(positionX, positionY);
        return obj;
    },
    initSize: function(sizeX, sizeY) {
        this.size = TYPE6.Vector2D.create(sizeX, sizeY);
        this.halfSize = this.size.halve();
    },
    initPosition: function(positionX, positionY) {
        this.position = TYPE6.Vector2D.create(positionX, positionY);
        this.topLeftCorner = TYPE6.Vector2D.create(positionX - this.halfSize.getX(), positionY - this.halfSize.getY());
        this.bottomRightCorner = TYPE6.Vector2D.create(positionX + this.halfSize.getX(), positionY + this.halfSize.getY());
    },
    copy: function(rectangle) {
        return this.create(rectangle.getPositionX(), rectangle.getPositionY(), rectangle.getSizeX(), rectangle.getSizeY());
    },
    copyTo: function(rectangle) {
        this.setSizeFromVector2D(rectangle.getSize());
        this.setPositionFromVector2D(rectangle.getPosition());
    },
    setPositionXY: function(positionX, positionY) {
        this.position.setXY(positionX, positionY);
        this.setTopLeftCornerXY(positionX - this.getHalfSizeX(), positionY - this.getHalfSizeY());
        this.setBottomRightCornerXY(positionX + this.getHalfSizeX(), positionY + this.getHalfSizeY());
        return this.position;
    },
    setPositionFromVector2D: function(position) {
        this.position.copyTo(position);
        this.setTopLeftCornerXY(position.getX() - this.getHalfSizeX(), position.getY() - this.getHalfSizeY());
        this.setBottomRightCornerXY(position.getX() + this.getHalfSizeX(), position.getY() + this.getHalfSizeY());
        return this.position;
    },
    setTopLeftCornerXY: function(topLeftCornerX, topLeftCornerY) {
        this.topLeftCorner.setXY(topLeftCornerX, topLeftCornerY);
        return this.topLeftCorner;
    },
    setTopLeftCornerFromVector2D: function(topLeftCorner) {
        this.topLeftCorner.copyTo(topLeftCorner);
        return this.topLeftCorner;
    },
    setBottomRightCornerXY: function(bottomRightCornerX, bottomRightCornerY) {
        this.bottomRightCorner.setXY(bottomRightCornerX, bottomRightCornerY);
        return this.bottomRightCorner;
    },
    setBottomRightCornerFromVector2D: function(bottomRightCorner) {
        this.bottomRightCorner.copyTo(bottomRightCorner);
        return this.bottomRightCorner;
    },
    getPosition: function() {
        return this.position;
    },
    getPositionX: function() {
        return this.position.getX();
    },
    getPositionY: function() {
        return this.position.getY();
    },
    getTopLeftCorner: function() {
        return this.topLeftCorner;
    },
    getTopLeftCornerX: function() {
        return this.topLeftCorner.getX();
    },
    getTopLeftCornerY: function() {
        return this.topLeftCorner.getY();
    },
    getBottomRightCorner: function() {
        return this.bottomRightCorner;
    },
    getBottomRightCornerX: function() {
        return this.bottomRightCorner.getX();
    },
    getBottomRightCornerY: function() {
        return this.bottomRightCorner.getY();
    },
    setSizeXY: function(sizeX, sizeY) {
        this.size.setXY(sizeX, sizeY);
        return this.size;
    },
    setSizeFromVector2D: function(size) {
        this.size.copyTo(size);
        return this.size;
    },
    getSize: function() {
        return this.size;
    },
    getSizeX: function() {
        return this.size.getX();
    },
    getSizeY: function() {
        return this.size.getY();
    },
    getHalfSize: function() {
        return this.halfSize;
    },
    getHalfSizeX: function() {
        return this.halfSize.getX();
    },
    getHalfSizeY: function() {
        return this.halfSize.getY();
    },
    draw: function(context, color) {
        context.fillStyle = color;
        context.fillRect(this.topLeftCorner.getX(), this.topLeftCorner.getY(), this.size.getX(), this.size.getY());
    }
};

TYPE6.Trigonometry = {
    PI: TYPE6.MathUtils.round(Math.PI, 2),
    TWOPI: TYPE6.MathUtils.round(Math.PI * 2, 2),
    HALFPI: TYPE6.MathUtils.round(Math.PI * .5, 2),
    sineDecimals: 2,
    cosineDecimals: 2,
    arctanDecimals: 2,
    factorialArray: [],
    sineLoops: {
        0: 9,
        1: 11,
        2: 13,
        3: 15,
        4: 17,
        5: 18,
        6: 19,
        7: 21,
        8: 23
    },
    cosineLoops: {
        0: 6,
        1: 8,
        2: 10,
        3: 12,
        4: 14,
        5: 16,
        6: 18,
        7: 20,
        8: 22
    },
    arctanLoops: {
        0: 17,
        1: 19,
        2: 21,
        3: 23,
        4: 25,
        5: 27,
        6: 29,
        7: 31,
        8: 33
    },
    setSinePrecision: function(value) {
        if (this.sineLoops.hasOwnProperty(property)) {
            this.sineDecimals = value;
            return value;
        }
        this.sineDecimals = 2;
        return 2;
    },
    setCosinePrecision: function(value) {
        if (this.cosineLoops.hasOwnProperty(property)) {
            this.cosineDecimals = value;
            return value;
        }
        this.cosineDecimals = 2;
        return 2;
    },
    degreeToRadian: function(degree) {
        return degree * this.PI / 180;
    },
    radianToDegree: function(radian) {
        return radian * 180 / this.PI;
    },
    sine: function(angle) {
        angle = this.normalizeRadian(angle);
        if (this.sineDecimals <= 2 && (angle < .28 && angle > -.28)) {
            return angle;
        } else {
            return this.taylorSerie(3, this.sineLoops[this.sineDecimals], angle, angle, true);
        }
    },
    cosine: function(angle) {
        angle = this.normalizeRadian(angle);
        var squaredAngle = angle * angle;
        if (this.cosineDecimals <= 2 && (angle <= .5 && angle >= -.5)) {
            return 1 - squaredAngle * .5;
        } else {
            return this.taylorSerie(2, this.cosineLoops[this.cosineDecimals], 1, angle, true);
        }
    },
    arctan2: function(x, y) {
        var angle = y / x;
        if (x > 0) {
            return this.arctan(angle);
        } else if (x < 0) {
            if (y < 0) {
                return this.arctan(angle) - this.PI;
            } else {
                return this.arctan(angle) + this.PI;
            }
        } else {
            if (y < 0) {
                return -this.HALFPI;
            } else if (y > 0) {
                return this.HALFPI;
            } else {
                return false;
            }
        }
    },
    arctan2fromVector2D: function(vector2D) {
        return this.arctan2(vector2D.getX(), vector2D.getY());
    },
    arctan: function(angle) {
        var loops = this.arctanLoops[this.arctanDecimals];
        if (angle < 1 && angle > -1) {
            return this.taylorSerie(3, loops, angle, angle, false);
        } else {
            if (angle >= 1) {
                angle = 1 / angle;
                return -(this.taylorSerie(3, loops, angle, angle, false) - this.HALFPI);
            } else {
                angle = -1 / angle;
                return this.taylorSerie(3, loops, angle, angle, false) - this.HALFPI;
            }
        }
    },
    sineEquation: function(amplitude, period, shiftX, shiftY) {
        return amplitude * this.sine(period + shiftX) + shiftY;
    },
    cosineEquation: function(amplitude, period, shiftX, shiftY) {
        return amplitude * this.cosine(period + shiftX) + shiftY;
    },
    arctanEquation: function(amplitude, period, shiftX, shiftY) {
        return amplitude * this.arctan(period + shiftX) + shiftY;
    },
    taylorSerie: function(start, max, x, angle, needFactorial) {
        var squaredAngle = angle * angle;
        var result = x;
        var denominator = 0;
        var sign = -1;
        for (var i = 0; start <= max; start += 2, i++) {
            x *= squaredAngle;
            denominator = needFactorial ? this.factorialArray[start] : start;
            result += x / denominator * sign;
            sign = TYPE6.MathUtils.getOppositeSign(sign);
        }
        return result;
    },
    createFactorialArray: function() {
        for (var i = 1, f = 1; i <= Math.max(this.sineLoops[8] * 3, this.cosineLoops[8] * 2); i++) {
            f *= this.factorial(i);
            this.factorialArray.push(f);
        }
    },
    factorial: function(i) {
        return i > 1 ? i - 1 : 1;
    },
    normalizeRadian: function(angle) {
        if (angle > this.PI || angle < -this.PI) {
            return angle - this.TWOPI * Math.floor((angle + this.PI) / this.TWOPI);
        }
        return angle;
    }
};

TYPE6.Trigonometry.createFactorialArray();
/** MIT License
* 
* Copyright (c) 2015 Ludovic CLUBER 
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
* http://taipanjs.lcluber.com
*/
var TAIPAN = {
    revision: "0.2.1",
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
            }
            return false;
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