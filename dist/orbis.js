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
    revision: "0.4.4",
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
        _this.animation = FRAMERAT.create(_this.animate);
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
        this.animation.play(this);
        return this.checkComplete();
    },
    animate: function() {
        this.percentage += this.speed * this.animation.getDelta().getSecond();
        if (this.percentage >= this.target) {
            this.percentage = this.target;
            this.animation.stop();
        } else this.animation.newFrame(this);
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
    revision: "0.2.2",
    id: null,
    onAnimate: function() {},
    frameNumber: 0,
    fsm: {},
    clock: {},
    frameId: 0,
    create: function(onAnimate) {
        var _this = Object.create(this);
        _this.onAnimate = onAnimate;
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
            name: "pause",
            from: "running",
            to: "paused"
        } ]);
    },
    play: function(scope) {
        if (this.fsm.play()) {
            this.clock.start();
            this.requestNewFrame(scope);
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
            this.frameNumber = 0;
            return true;
        }
        return false;
    },
    getTotalTime: function(decimals) {
        return this.clock.getTotal(decimals);
    },
    getFrameNumber: function() {
        return this.frameNumber;
    },
    getRoundedDelta: function(refreshRate, decimals) {
        this.computeRoundedDelta(refreshRate, decimals);
        return this.clock.getRoundedDelta();
    },
    computeRoundedDelta: function(refreshRate, decimals) {
        if (this.frameNumber % refreshRate === 0) this.clock.computeRoundedDelta(decimals);
    },
    getDelta: function() {
        return this.clock.getDelta();
    },
    getFramePerSecond: function(refreshRate, decimals) {
        if (this.frameNumber % refreshRate === 0) this.clock.computeFramePerSecond(decimals);
        return this.clock.getFramePerSecond();
    },
    newFrame: function(scope) {
        this.requestNewFrame(scope);
        this.clock.tick();
    },
    requestNewFrame: function(scope) {
        if (!scope) this.frameId = window.requestAnimationFrame(this.onAnimate); else this.frameId = window.requestAnimationFrame(this.onAnimate.bind(scope));
        this.frameNumber++;
    },
    cancelAnimation: function() {
        window.cancelAnimationFrame(this.frameId);
    }
};

FRAMERAT.Time = {
    millisecond: 0,
    second: 0,
    create: function(millisecond) {
        var _this = Object.create(this);
        _this.set(millisecond, 0);
        return _this;
    },
    set: function(x, min) {
        this.millisecond = Math.max(x, min);
        this.second = this.millisecondToSecond(this.millisecond);
    },
    getSecond: function() {
        return this.second;
    },
    getMillisecond: function() {
        return this.millisecond;
    },
    millisecondToSecond: function(millisecond) {
        return millisecond * .001;
    }
};

FRAMERAT.Clock = {
    revision: "0.1.0",
    minimumTick: 16,
    old: performance.now(),
    "new": performance.now(),
    total: 0,
    fps: 0,
    delta: FRAMERAT.Time.create(0),
    roundedDelta: FRAMERAT.Time.create(0),
    create: function() {
        var _this = Object.create(this);
        _this.init();
        return _this;
    },
    init: function() {
        this.total = 0;
        this.fps = 0;
        this.delta.set(0, this.minimumTick);
    },
    start: function() {
        this.old = performance.now();
    },
    tick: function() {
        this.new = performance.now();
        this.delta.set(this.new - this.old, this.minimumTick);
        this.old = this.new;
        this.total += this.delta.second;
    },
    getTotal: function(decimals) {
        return this.round(this.total, decimals);
    },
    computeRoundedDelta: function(decimals) {
        this.roundedDelta.second = this.delta.second ? this.round(this.delta.second, decimals) : 0;
        this.roundedDelta.millisecond = this.delta.millisecond ? this.round(this.delta.millisecond, decimals) : 0;
    },
    getRoundedDelta: function() {
        return this.roundedDelta;
    },
    getDelta: function() {
        return this.delta;
    },
    computeFramePerSecond: function(decimals) {
        this.fps = this.round(1e3 / this.delta.millisecond, decimals);
    },
    getFramePerSecond: function() {
        return this.fps;
    },
    round: function(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.round(x * decimals) / decimals;
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