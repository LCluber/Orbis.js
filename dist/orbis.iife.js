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

var Orbis = (function (exports) {
    'use strict';

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /** MIT License
    * 
    * Copyright (c) 2018 Ludovic CLUBER 
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
    * http://weejs.lcluber.com
    */

    var Check = function () {
        function Check() {
            _classCallCheck(this, Check);
        }

        _createClass(Check, null, [{
            key: 'isJSON',
            value: function isJSON(str) {
                var json = str.replace(/(\r\n|\n|\r|\t)/gm, '');
                try {
                    json = JSON.parse(str);
                } catch (e) {
                    console.log(e);
                    return false;
                }
                return json;
            }
        }, {
            key: 'isFunction',
            value: function isFunction(func) {
                var getType = {};
                return func && getType.toString.call(func) === '[object Function]';
            }
        }, {
            key: 'isObject',
            value: function isObject(object) {
                return object !== null && (this.isFunction(object) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object');
            }
        }, {
            key: 'isASCII',
            value: function isASCII(code, extended) {
                return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(code);
            }
        }, {
            key: 'isInteger',
            value: function isInteger(value) {
                return value === parseInt(value, 10);
            }
        }]);

        return Check;
    }();

    var Dom = function () {
        function Dom() {
            _classCallCheck(this, Dom);
        }

        _createClass(Dom, null, [{
            key: 'scrollToBottom',
            value: function scrollToBottom(HtmlElement) {
                HtmlElement.scrollTop = HtmlElement.scrollHeight;
            }
        }, {
            key: 'findById',
            value: function findById(id) {
                return document.getElementById(id);
            }
        }, {
            key: 'showById',
            value: function showById(a) {
                this.findById(a).style.display = 'block';
            }
        }, {
            key: 'hideById',
            value: function hideById(a) {
                this.findById(a).style.display = 'none';
            }
        }, {
            key: 'showOverflow',
            value: function showOverflow() {
                document.body.style.overflow = 'visible';
            }
        }, {
            key: 'hideOverflow',
            value: function hideOverflow() {
                document.body.style.overflow = 'hidden';
            }
        }, {
            key: 'getInputValue',
            value: function getInputValue(a) {
                return this.findById(a).value;
            }
        }, {
            key: 'clearInputValue',
            value: function clearInputValue(a) {
                this.findById(a).value = '';
            }
        }, {
            key: 'focusOn',
            value: function focusOn(a) {
                this.findById(a).focus();
            }
        }, {
            key: 'addHTMLElement',
            value: function addHTMLElement(parentElement, childElementType, childElementOptions) {
                var newElement = document.createElement(childElementType);
                if (childElementOptions !== undefined) {
                    Object.keys(childElementOptions).forEach(function (key) {
                        if (key === 'textContent') {
                            newElement.textContent = childElementOptions[key];
                        } else {
                            newElement.setAttribute(key, childElementOptions[key]);
                        }
                    });
                }
                parentElement.appendChild(newElement);
                return newElement;
            }
        }]);

        return Dom;
    }();

    var Bind = function () {
        function Bind(element, data) {
            _classCallCheck(this, Bind);

            this.data = data;
            this.element = element;
            this.element.value = data;
            this.element.addEventListener('change', this, false);
        }

        _createClass(Bind, [{
            key: 'handleEvent',
            value: function handleEvent(event) {
                switch (event.type) {
                    case 'change':
                        this.change(this.element.value);
                }
            }
        }, {
            key: 'change',
            value: function change(value) {
                this.data = value;
                this.element.value = value;
            }
        }]);

        return Bind;
    }();

    var String = function () {
        function String() {
            _classCallCheck(this, String);
        }

        _createClass(String, null, [{
            key: 'ucfirst',
            value: function ucfirst(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }, {
            key: 'toASCII',
            value: function toASCII(code) {
                return code.charCodeAt(0);
            }
        }]);

        return String;
    }();

    var Ajax = function () {
        function Ajax() {
            _classCallCheck(this, Ajax);
        }

        _createClass(Ajax, null, [{
            key: 'call',
            value: function call(url) {
                var _this = this;

                return new Promise(function (resolve, reject) {
                    var http = new XMLHttpRequest();
                    if (_this.noCache) {
                        url += '?cache=' + new Date().getTime();
                    }
                    http.open(_this.method, url, _this.async);
                    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    http.onreadystatechange = function () {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                console.log('xhr done successfully (' + url + ')');
                                resolve(http.responseText);
                            } else {
                                console.log('error', 'xhr failed (' + url + ')');
                                reject(http.status);
                            }
                        }
                    };
                    console.log('xhr processing starting (' + url + ')');
                    http.send();
                });
            }
        }]);

        return Ajax;
    }();

    Ajax.method = 'GET';
    Ajax.async = true;
    Ajax.noCache = false;

    var File = function () {
        function File() {
            _classCallCheck(this, File);
        }

        _createClass(File, null, [{
            key: 'load',
            value: function load(path) {
                return Ajax.call(path);
            }
        }, {
            key: 'removeTrailingSlash',
            value: function removeTrailingSlash(path) {
                return path.replace(/\/+$/, '');
            }
        }, {
            key: 'getName',
            value: function getName(path) {
                return path.replace(/^.*[\\\/]/, '');
            }
        }, {
            key: 'getExtension',
            value: function getExtension(path) {
                return path.split('.').pop();
            }
        }, {
            key: 'getDirectory',
            value: function getDirectory(path) {
                return path.replace(/[^\\\/]*$/, '');
            }
        }, {
            key: 'checkExtension',
            value: function checkExtension(extension, validExtensions) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = validExtensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var validExtension = _step.value;

                        if (extension === validExtension) {
                            return true;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return false;
            }
        }]);

        return File;
    }();

    var Img = function () {
        function Img() {
            _classCallCheck(this, Img);
        }

        _createClass(Img, null, [{
            key: 'load',
            value: function load(path) {
                return new Promise(function (resolve, reject) {
                    var img = new Image();
                    img.src = path;
                    img.name = File.getName(path);
                    console.log('xhr processing starting (' + path + ')');
                    img.addEventListener('load', function () {
                        console.log('xhr done successfully (' + path + ')');
                        resolve(img);
                    });
                    img.addEventListener('error', function () {
                        console.log('error', 'xhr failed (' + path + ')');
                        reject(new Error('xhr failed (' + path + ')'));
                    });
                });
            }
        }]);

        return Img;
    }();

    var Sound = function () {
        function Sound() {
            _classCallCheck(this, Sound);
        }

        _createClass(Sound, null, [{
            key: 'load',
            value: function load(path) {
                return new Promise(function (resolve, reject) {
                    var snd = new Audio();
                    snd.src = path;
                    console.log('xhr processing starting (' + path + ')');
                    snd.addEventListener('canplaythrough', function () {
                        console.log('xhr done successfully (' + path + ')');
                        resolve(snd);
                    }, false);
                    snd.addEventListener('canplay', function () {
                        console.log('xhr done successfully (' + path + ')');
                        resolve(snd);
                    }, false);
                    snd.addEventListener('error', function () {
                        console.log('error', 'xhr failed (' + path + ')');
                        reject(new Error('xhr failed (' + path + ')'));
                    }, false);
                });
            }
        }]);

        return Sound;
    }();

    var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    * http://weejs.lcluber.com
    */

    var Check$1 = function () {
        function Check() {
            _classCallCheck$1(this, Check);
        }

        _createClass$1(Check, null, [{
            key: 'isJSON',
            value: function isJSON(str) {
                var json = str.replace(/(\r\n|\n|\r|\t)/gm, '');
                try {
                    json = JSON.parse(str);
                } catch (e) {
                    console.log(e);
                    return false;
                }
                return json;
            }
        }, {
            key: 'isFunction',
            value: function isFunction(func) {
                var getType = {};
                return func && getType.toString.call(func) === '[object Function]';
            }
        }, {
            key: 'isObject',
            value: function isObject(object) {
                return object !== null && (this.isFunction(object) || (typeof object === 'undefined' ? 'undefined' : _typeof$1(object)) === 'object');
            }
        }, {
            key: 'isASCII',
            value: function isASCII(code, extended) {
                return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(code);
            }
        }, {
            key: 'isInteger',
            value: function isInteger(value) {
                return value === parseInt(value, 10);
            }
        }]);

        return Check;
    }();

    var Dom$1 = function () {
        function Dom() {
            _classCallCheck$1(this, Dom);
        }

        _createClass$1(Dom, null, [{
            key: 'scrollToBottom',
            value: function scrollToBottom(HtmlElement) {
                HtmlElement.scrollTop = HtmlElement.scrollHeight;
            }
        }, {
            key: 'findById',
            value: function findById(id) {
                return document.getElementById(id);
            }
        }, {
            key: 'showById',
            value: function showById(a) {
                this.findById(a).style.display = 'block';
            }
        }, {
            key: 'hideById',
            value: function hideById(a) {
                this.findById(a).style.display = 'none';
            }
        }, {
            key: 'showOverflow',
            value: function showOverflow() {
                document.body.style.overflow = 'visible';
            }
        }, {
            key: 'hideOverflow',
            value: function hideOverflow() {
                document.body.style.overflow = 'hidden';
            }
        }, {
            key: 'getInputValue',
            value: function getInputValue(a) {
                return this.findById(a).value;
            }
        }, {
            key: 'clearInputValue',
            value: function clearInputValue(a) {
                this.findById(a).value = '';
            }
        }, {
            key: 'focusOn',
            value: function focusOn(a) {
                this.findById(a).focus();
            }
        }, {
            key: 'addHTMLElement',
            value: function addHTMLElement(parentElement, childElementType, childElementOptions) {
                var newElement = document.createElement(childElementType);
                if (childElementOptions !== undefined) {
                    Object.keys(childElementOptions).forEach(function (key) {
                        if (key === 'textContent') {
                            newElement.textContent = childElementOptions[key];
                        } else {
                            newElement.setAttribute(key, childElementOptions[key]);
                        }
                    });
                }
                parentElement.appendChild(newElement);
                return newElement;
            }
        }]);

        return Dom;
    }();

    var Bind$1 = function () {
        function Bind(element, data) {
            _classCallCheck$1(this, Bind);

            this.data = data;
            this.element = element;
            this.element.value = data;
            this.element.addEventListener('change', this, false);
        }

        _createClass$1(Bind, [{
            key: 'handleEvent',
            value: function handleEvent(event) {
                switch (event.type) {
                    case 'change':
                        this.change(this.element.value);
                }
            }
        }, {
            key: 'change',
            value: function change(value) {
                this.data = value;
                this.element.value = value;
            }
        }]);

        return Bind;
    }();

    var String$1 = function () {
        function String() {
            _classCallCheck$1(this, String);
        }

        _createClass$1(String, null, [{
            key: 'ucfirst',
            value: function ucfirst(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }, {
            key: 'toASCII',
            value: function toASCII(code) {
                return code.charCodeAt(0);
            }
        }]);

        return String;
    }();

    var Ajax$1 = function () {
        function Ajax() {
            _classCallCheck$1(this, Ajax);
        }

        _createClass$1(Ajax, null, [{
            key: 'call',
            value: function call(url) {
                var _this = this;

                return new Promise(function (resolve, reject) {
                    var http = new XMLHttpRequest();
                    if (_this.noCache) {
                        url += '?cache=' + new Date().getTime();
                    }
                    http.open(_this.method, url, _this.async);
                    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    http.onreadystatechange = function () {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                console.log('xhr done successfully (' + url + ')');
                                resolve(http.responseText);
                            } else {
                                console.log('error', 'xhr failed (' + url + ')');
                                reject(http.status);
                            }
                        }
                    };
                    console.log('xhr processing starting (' + url + ')');
                    http.send();
                });
            }
        }]);

        return Ajax;
    }();

    Ajax$1.method = 'GET';
    Ajax$1.async = true;
    Ajax$1.noCache = false;

    var File$1 = function () {
        function File() {
            _classCallCheck$1(this, File);
        }

        _createClass$1(File, null, [{
            key: 'load',
            value: function load(path) {
                return Ajax$1.call(path);
            }
        }, {
            key: 'removeTrailingSlash',
            value: function removeTrailingSlash(path) {
                return path.replace(/\/+$/, '');
            }
        }, {
            key: 'getName',
            value: function getName(path) {
                return path.replace(/^.*[\\\/]/, '');
            }
        }, {
            key: 'getExtension',
            value: function getExtension(path) {
                return path.split('.').pop();
            }
        }, {
            key: 'getDirectory',
            value: function getDirectory(path) {
                return path.replace(/[^\\\/]*$/, '');
            }
        }, {
            key: 'checkExtension',
            value: function checkExtension(extension, validExtensions) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = validExtensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var validExtension = _step.value;

                        if (extension === validExtension) {
                            return true;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return false;
            }
        }]);

        return File;
    }();

    var Img$1 = function () {
        function Img() {
            _classCallCheck$1(this, Img);
        }

        _createClass$1(Img, null, [{
            key: 'load',
            value: function load(path) {
                return new Promise(function (resolve, reject) {
                    var img = new Image();
                    img.src = path;
                    img.name = File$1.getName(path);
                    console.log('xhr processing starting (' + path + ')');
                    img.addEventListener('load', function () {
                        console.log('xhr done successfully (' + path + ')');
                        resolve(img);
                    });
                    img.addEventListener('error', function () {
                        console.log('error', 'xhr failed (' + path + ')');
                        reject(new Error('xhr failed (' + path + ')'));
                    });
                });
            }
        }]);

        return Img;
    }();

    var Sound$1 = function () {
        function Sound() {
            _classCallCheck$1(this, Sound);
        }

        _createClass$1(Sound, null, [{
            key: 'load',
            value: function load(path) {
                return new Promise(function (resolve, reject) {
                    var snd = new Audio();
                    snd.src = path;
                    console.log('xhr processing starting (' + path + ')');
                    snd.addEventListener('canplaythrough', function () {
                        console.log('xhr done successfully (' + path + ')');
                        resolve(snd);
                    }, false);
                    snd.addEventListener('canplay', function () {
                        console.log('xhr done successfully (' + path + ')');
                        resolve(snd);
                    }, false);
                    snd.addEventListener('error', function () {
                        console.log('error', 'xhr failed (' + path + ')');
                        reject(new Error('xhr failed (' + path + ')'));
                    }, false);
                });
            }
        }]);

        return Sound;
    }();

    var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    * http://mouettejs.lcluber.com
    */

    var LEVELS = [{ id: 1, name: 'info' }, { id: 2, name: 'trace' }, { id: 3, name: 'warn' }, { id: 4, name: 'error' }, { id: 99, name: 'off' }];

    var Message = function () {
        function Message(levelName, content) {
            _classCallCheck$2(this, Message);

            this.setLevel(levelName);
            this.content = content;
        }

        _createClass$2(Message, [{
            key: 'setLevel',
            value: function setLevel(name) {
                this.level = this.findLevel(name);
            }
        }, {
            key: 'getLevelId',
            value: function getLevelId() {
                return this.level.id;
            }
        }, {
            key: 'display',
            value: function display() {
                console[this.level.name](this.content);
            }
        }, {
            key: 'findLevel',
            value: function findLevel(name) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = LEVELS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var level = _step.value;

                        if (level.name === name) {
                            return level;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return this.level ? this.level : LEVELS[0];
            }
        }]);

        return Message;
    }();

    var Logger = function () {
        function Logger() {
            _classCallCheck$2(this, Logger);
        }

        _createClass$2(Logger, [{
            key: 'level',
            set: function set(name) {
                Logger._level = Logger.findLevel(name);
            },
            get: function get() {
                return Logger._level.name;
            }
        }], [{
            key: 'info',
            value: function info(text) {
                Logger.log('info', text);
            }
        }, {
            key: 'trace',
            value: function trace(text) {
                Logger.log('trace', text);
            }
        }, {
            key: 'time',
            value: function time(text) {
                Logger.log('time', text);
            }
        }, {
            key: 'warn',
            value: function warn(text) {
                Logger.log('warn', text);
            }
        }, {
            key: 'error',
            value: function error(text) {
                Logger.log('error', text);
            }
        }, {
            key: 'log',
            value: function log(levelName, content) {
                Logger.addMessage(levelName, content);
                var message = this.messages[this.nbMessages - 1];
                if (this._level.id <= message.getLevelId()) {
                    message.display();
                }
            }
        }, {
            key: 'addMessage',
            value: function addMessage(levelName, content) {
                this.messages.push(new Message(levelName, content));
                this.nbMessages++;
            }
        }, {
            key: 'findLevel',
            value: function findLevel(name) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = LEVELS[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var level = _step2.value;

                        if (level.name === name) {
                            return level;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return this._level ? this._level : LEVELS[0];
            }
        }]);

        return Logger;
    }();

    Logger._level = Logger.findLevel(LEVELS[0].name);
    Logger.messages = [];
    Logger.nbMessages = 0;
    Logger.target = Dom$1.findById('Mouette');

    function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    var FSM = function FSM(events) {
        var _this = this;

        _classCallCheck$3(this, FSM);

        this.state = events[0].from;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            var _loop = function _loop() {
                var event = _step.value;

                if (!_this.hasOwnProperty(event.name)) {
                    _this[event.name] = function () {
                        Logger.info('- Event ' + event.name + ' triggered');
                        if (_this.state == event.from) {
                            _this.state = event.to;
                            Logger.info('from ' + event.from + ' to ' + _this.state);
                            return true;
                        }
                        Logger.warn('Cannot transition from ' + _this.state + ' to ' + event.to);
                        return false;
                    };
                }
            };

            for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _loop();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };

    var Ajax$2 = function () {
        function Ajax$$1() {}
        Ajax$$1.file = File;
        Ajax$$1.img = Img;
        Ajax$$1.sound = Sound;
        return Ajax$$1;
    }();

    var Request = function () {
        function Request() {
            this.fsm = new FSM([{ name: 'send', from: 'idle', to: 'pending' }, { name: 'success', from: 'pending', to: 'success' }, { name: 'error', from: 'pending', to: 'error' }]);
            this.ajax = Ajax$2;
        }
        Request.prototype.send = function (path, type) {
            var _this = this;
            if (this.fsm['send']()) {
                return this.ajax[type].load(path).then(function (response) {
                    _this.fsm['success']();
                    return response;
                }).catch(function (err) {
                    Logger.error(err.message);
                    _this.fsm['error']();
                    return false;
                });
            }
        };
        return Request;
    }();

    var Asset = function () {
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
                        var json = Check.isJSON(response);
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
    }();

    var Progress = function () {
        function Progress(barId, textId, nbAssets) {
            this.rate = 0.0;
            this.total = 0;
            this.percentage = 0.0;
            this.target = 0;
            this.speed = 40;
            this.nbAssets = nbAssets;
            if (barId) {
                var element = Dom.findById(barId);
                if (element) {
                    this.bar = new Bind(element, '0');
                }
            }
            if (textId) {
                var element = Dom.findById(textId);
                if (element) {
                    this.text = new Bind(element, 'Loading started');
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
    }();

    var Loader = function () {
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
                var extension = File.getExtension(configFilePath);
                var type = _this.getAssetType(extension);
                if (type === 'file') {
                    return request.send(configFilePath, type).then(function (response) {
                        if (response) {
                            var json = Check.isJSON(response);
                            if (json) {
                                _this.assets = json;
                                var nbAssets = _this.createAssets(File.removeTrailingSlash(assetsPath));
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
                                } else {
                                    reject('!! nothing to load here');
                                }
                            }
                        }
                    }).catch(function (err) {
                        Logger.error(configFilePath + ' : ' + err.message);
                        console.log('error', err.message);
                    });
                } else {
                    reject('!! the config file must be of type "file"');
                }
            });
        };
        Loader.prototype.getAssetType = function (extension) {
            for (var property in this.validExtensions) {
                if (this.validExtensions.hasOwnProperty(property)) {
                    if (File.checkExtension(extension, this.validExtensions[property])) {
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
                            var extension = File.getExtension(file.name);
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
    }();

    exports.Loader = Loader;

    return exports;

}({}));
