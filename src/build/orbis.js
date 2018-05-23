import * as WEE from '../../bower_components/Weejs/dist/wee';
import * as MOUETTE from '../../bower_components/Mouettejs/dist/mouette';
import { Asset } from './asset';
import { Request } from './request';
import { Progress } from './progress';
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
export { Loader };
//# sourceMappingURL=orbis.js.map