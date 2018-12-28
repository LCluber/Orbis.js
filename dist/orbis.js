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

import { Bind, Dom, File, Img, Sound } from '@lcluber/weejs';
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
    }
}

class Asset {
    constructor(path, file, extension, type) {
        this.path = path;
        this.file = file;
        this.extension = extension;
        this.type = type;
        this.request = new Request();
    }
    sendRequest() {
        return this.request.send(this.path + this.file, this.type).then((response) => {
            if (response) {
                this.response = response;
            }
            return this.file;
        });
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

class Progress {
    constructor(barId, textId, nbAssets) {
        this.rate = 0.0;
        this.total = 0;
        this.percentage = 0.0;
        this.target = 0;
        this.speed = 40;
        this.nbAssets = nbAssets;
        if (barId) {
            let element = Dom.findById(barId);
            if (element) {
                this.bar = new Bind(element, '0');
            }
        }
        if (textId) {
            let element = Dom.findById(textId);
            if (element) {
                this.text = new Bind(element, 'Loading started');
            }
        }
    }
    update(text) {
        this.total++;
        this.rate = this.total / this.nbAssets;
        this.target = Math.round(this.rate * 100);
        this.text.change(text);
    }
    updateBar(delta) {
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
    }
}

class Loader {
    constructor() {
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
    launch(list, assetsPath, progressBarId, progressTextId) {
        return new Promise((resolve, reject) => {
            this.assets = list;
            let nbAssets = this.createAssets(File.removeTrailingSlash(assetsPath));
            if (nbAssets) {
                this.progress = new Progress(progressBarId, progressTextId, nbAssets);
                let intervalID = setInterval(() => {
                    this.sendRequest();
                    let percentage = this.progress.updateBar(this.tick);
                    if (percentage === 100) {
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
    createAssets(path) {
        let nbAssets = 0;
        for (let property in this.assets) {
            if (this.assets.hasOwnProperty(property)) {
                let type = this.assets[property];
                let folder = type.folder ? type.folder + '/' : '';
                for (let file of type.files) {
                    if (file.hasOwnProperty('name')) {
                        let extension = File.getExtension(file.name);
                        let type = this.getAssetType(extension);
                        if (type) {
                            file.asset = new Asset(path + '/' + folder, file.name, extension, type);
                            nbAssets++;
                        }
                    }
                }
            }
        }
        return nbAssets;
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
            return false;
        }
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
