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

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('../../bower_components/Weejs/dist/wee.js'), require('../../bower_components/Mouettejs/dist/mouette.js'), require('../../bower_components/Taipanjs/dist/taipan.js')) :
    typeof define === 'function' && define.amd ? define(['exports', '../../bower_components/Weejs/dist/wee.js', '../../bower_components/Mouettejs/dist/mouette.js', '../../bower_components/Taipanjs/dist/taipan.js'], factory) :
    (factory((global.ORBIS = {}),global.WEE,global.MOUETTE,global.TAIPAN));
}(this, (function (exports,WEE,MOUETTE,TAIPAN) { 'use strict';

    var Request = (function () {
        function Request() {
            this.fsm = new TAIPAN.FSM([
                { name: 'send', from: 'idle', to: 'pending' },
                { name: 'success', from: 'pending', to: 'success' },
                { name: 'error', from: 'pending', to: 'error' }
            ]);
        }
        Request.prototype.send = function (path, type) {
            var _this = this;
            if (this.fsm['send']()) {
                return WEE[WEE.String.ucfirst(type)].load(path).then(function (response) {
                    _this.fsm['success']();
                    return response;
                }).catch(function (err) {
                    MOUETTE.Logger.error(err.message);
                    _this.fsm['error']();
                    return false;
                });
            }
        };
        return Request;
    }());

    var Asset = (function () {
        function Asset(path, file, extension, type) {
            this.path = path;
            this.file = file;
            this.extension = extension;
            this.type = type;
            this.request = new Request();
        }
        Asset.prototype.sendRequest = function () {
            var _this = this;
            return this.request.send(this.path + this.file, this.type).then(function (response) {
                if (response) {
                    _this.response = response;
                    if (_this.type === 'file') {
                        var json = WEE.Check.isJSON(response);
                        if (json) {
                            _this.response = json;
                        }
                    }
                }
                return _this.file;
            });
        };
        Asset.prototype.getRequestStatus = function () {
            return this.request.fsm.state;
        };
        Asset.prototype.isRequestSent = function () {
            if (this.getRequestStatus() != 'idle') {
                return true;
            }
            return false;
        };
        return Asset;
    }());

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

    var Loader = (function () {
        function Loader() {
            this.default = {
                maxPending: 6,
                tick: 100
            };
            this.validExtensions = {
                file: ['txt', 'text', 'json', 'glsl', 'babylon'],
                img: ['png', 'jpg', 'jpeg', 'gif'],
                sound: ['mp3', 'ogg', 'wav']
            };
            this.pendingRequests = 0;
            this.tick = this.default.tick;
            this.maxPendingRequests = this.default.maxPending;
        }
        Loader.prototype.getAsset = function (name) {
            for (var property in this.assets) {
                if (this.assets.hasOwnProperty(property)) {
                    for (var _i = 0, _a = this.assets[property].files; _i < _a.length; _i++) {
                        var file = _a[_i];
                        if (file.name == name) {
                            return file;
                        }
                    }
                }
            }
            return false;
        };
        Loader.prototype.getList = function (type) {
            if (this.assets.hasOwnProperty(type)) {
                return this.assets[type].files;
            }
            return false;
        };
        Loader.prototype.launch = function (configFilePath, assetsPath, progressBarId, progressTextId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new Request();
                var extension = WEE.File.getExtension(configFilePath);
                var type = _this.getAssetType(extension);
                if (type === 'file') {
                    return request.send(configFilePath, type).then(function (response) {
                        if (response) {
                            var json = WEE.Check.isJSON(response);
                            if (json) {
                                _this.assets = json;
                                var nbAssets = _this.createAssets(WEE.File.removeTrailingSlash(assetsPath));
                                if (nbAssets) {
                                    _this.progress = new Progress(progressBarId, progressTextId, nbAssets);
                                    var intervalID_1 = setInterval(function () {
                                        _this.sendRequest();
                                        var percentage = _this.progress.updateBar(_this.tick);
                                        if (percentage === 100) {
                                            clearInterval(intervalID_1);
                                            resolve();
                                        }
                                    }, _this.tick);
                                }
                                else {
                                    reject('!! nothing to load here');
                                }
                            }
                        }
                    }).catch(function (err) {
                        MOUETTE.Logger.error(configFilePath + ' : ' + err.message);
                        console.log('error', err.message);
                    });
                }
                else {
                    reject('!! the config file must be of type "file"');
                }
            });
        };
        Loader.prototype.getAssetType = function (extension) {
            for (var property in this.validExtensions) {
                if (this.validExtensions.hasOwnProperty(property)) {
                    if (WEE.File.checkExtension(extension, this.validExtensions[property])) {
                        return property;
                    }
                }
            }
            return false;
        };
        Loader.prototype.createAssets = function (path) {
            var nbAssets = 0;
            for (var property in this.assets) {
                if (this.assets.hasOwnProperty(property)) {
                    var type = this.assets[property];
                    var folder = type.folder ? type.folder + '/' : '';
                    for (var _i = 0, _a = type.files; _i < _a.length; _i++) {
                        var file = _a[_i];
                        if (file.hasOwnProperty('name')) {
                            var extension = WEE.File.getExtension(file.name);
                            var type_1 = this.getAssetType(extension);
                            if (type_1) {
                                file.asset = new Asset(path + '/' + folder, file.name, extension, type_1);
                                nbAssets++;
                            }
                        }
                    }
                }
            }
            return nbAssets;
        };
        Loader.prototype.sendRequest = function () {
            var _this = this;
            if (this.pendingRequests < this.maxPendingRequests) {
                var nextAsset = this.getNextAssetToLoad();
                if (nextAsset) {
                    nextAsset.sendRequest().then(function (response) {
                        _this.pendingRequests--;
                        _this.progress.update(response);
                    });
                    return true;
                }
                return false;
            }
        };
        Loader.prototype.getNextAssetToLoad = function () {
            for (var property in this.assets) {
                if (this.assets.hasOwnProperty(property)) {
                    var type = this.assets[property];
                    for (var _i = 0, _a = type.files; _i < _a.length; _i++) {
                        var file = _a[_i];
                        if (file.hasOwnProperty('asset') && !file.asset.isRequestSent()) {
                            return file.asset;
                        }
                    }
                }
            }
            return false;
        };
        return Loader;
    }());

    exports.Loader = Loader;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
