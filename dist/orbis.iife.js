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

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    var LEVELS = {
        info: { id: 1, name: "info", color: "#28a745" },
        trace: { id: 2, name: "trace", color: "#17a2b8" },
        warn: { id: 3, name: "warn", color: "#ffc107" },
        error: { id: 4, name: "error", color: "#dc3545" },
        off: { id: 99, name: "off", color: null }
    };

    function addZero(value) {
        return value < 10 ? "0" + value : value;
    }
    function formatDate() {
        var now = new Date();
        var date = [addZero(now.getMonth() + 1), addZero(now.getDate()), now.getFullYear().toString().substr(-2)];
        var time = [addZero(now.getHours()), addZero(now.getMinutes()), addZero(now.getSeconds())];
        return date.join("/") + " " + time.join(":");
    }

    var Message = function () {
        function Message(level, content) {
            _classCallCheck(this, Message);

            this.id = level.id;
            this.name = level.name;
            this.color = level.color;
            this.content = content;
            this.date = formatDate();
        }

        _createClass(Message, [{
            key: "display",
            value: function display(groupName) {
                console[this.name]("%c[" + groupName + "] " + this.date + " : ", "color:" + this.color + ";", this.content);
            }
        }]);

        return Message;
    }();

    var Group = function () {
        function Group(name, level) {
            _classCallCheck(this, Group);

            this.messages = [];
            this.name = name;
            this.messages = [];
            this.level = level;
        }

        _createClass(Group, [{
            key: "setLevel",
            value: function setLevel(name) {
                this.level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : this.level;
                return this.getLevel();
            }
        }, {
            key: "getLevel",
            value: function getLevel() {
                return this.level.name;
            }
        }, {
            key: "info",
            value: function info(message) {
                this.log(LEVELS.info, message);
            }
        }, {
            key: "trace",
            value: function trace(message) {
                this.log(LEVELS.trace, message);
            }
        }, {
            key: "warn",
            value: function warn(message) {
                this.log(LEVELS.warn, message);
            }
        }, {
            key: "error",
            value: function error(message) {
                this.log(LEVELS.error, message);
            }
        }, {
            key: "log",
            value: function log(level, messageContent) {
                var message = new Message(level, messageContent);
                this.messages.push(message);
                if (this.level.id <= message.id) {
                    message.display(this.name);
                }
            }
        }]);

        return Group;
    }();

    var Logger = function () {
        function Logger() {
            _classCallCheck(this, Logger);
        }

        _createClass(Logger, null, [{
            key: "setLevel",
            value: function setLevel(name) {
                Logger.level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : Logger.level;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Logger.groups[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var group = _step.value;

                        group.setLevel(Logger.level.name);
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

                return Logger.getLevel();
            }
        }, {
            key: "getLevel",
            value: function getLevel() {
                return Logger.level.name;
            }
        }, {
            key: "getGroup",
            value: function getGroup(name) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Logger.groups[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var group = _step2.value;

                        if (group.name === name) {
                            return group;
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

                return null;
            }
        }, {
            key: "addGroup",
            value: function addGroup(name) {
                return this.getGroup(name) || this.pushGroup(name);
            }
        }, {
            key: "pushGroup",
            value: function pushGroup(name) {
                var group = new Group(name, Logger.level);
                Logger.groups.push(group);
                return group;
            }
        }]);

        return Logger;
    }();

    Logger.level = LEVELS.error;
    Logger.groups = [];

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    function isArray(array) {
        return array !== null && array.constructor === Array;
    }
    function isString(string) {
        return typeof string === "string";
    }
    function isHtmlElement(htmlElement) {
        if (htmlElement) {
            return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? htmlElement instanceof HTMLElement : htmlElement && (typeof htmlElement === "undefined" ? "undefined" : _typeof(htmlElement)) === "object" && htmlElement !== null && htmlElement.nodeType === 1 && typeof htmlElement.nodeName === "string";
        }
        return false;
    }
    function isHtmlEventAttribute(htmlEventAttribute) {
        switch (htmlEventAttribute) {
            case "onafterprint":
            case "onbeforeprint":
            case "onbeforeunload":
            case "onerror":
            case "onhashchange":
            case "onload":
            case "onmessage":
            case "onoffline":
            case "ononline":
            case "onpagehide":
            case "onpageshow":
            case "onpopstate":
            case "onresize":
            case "onstorage":
            case "onunload":
            case "onblur":
            case "onchange":
            case "oncontextmenu":
            case "onfocus":
            case "oninput":
            case "oninvalid":
            case "onreset":
            case "onsearch":
            case "onselect":
            case "onsubmit":
            case "onkeydown":
            case "onkeypress":
            case "onkeyup":
            case "onclick":
            case "ondblclick":
            case "onmousedown":
            case "onmousemove":
            case "onmouseout":
            case "onmouseover":
            case "onmouseup":
            case "onmousewheel":
            case "onwheel":
            case "ondrag":
            case "ondragend":
            case "ondragenter":
            case "ondragleave":
            case "ondragover":
            case "ondragstart":
            case "ondrop":
            case "onscroll":
            case "oncopy":
            case "oncut":
            case "onpaste":
            case "onabort":
            case "oncanplay":
            case "oncanplaythrough":
            case "oncuechange":
            case "ondurationchange":
            case "onemptied":
            case "onended":
            case "onerror":
            case "onloadeddata":
            case "onloadedmetadata":
            case "onloadstart":
            case "onpause":
            case "onplay":
            case "onplaying":
            case "onprogress":
            case "onratechange":
            case "onseeked":
            case "onseeking":
            case "onstalled":
            case "onsuspend":
            case "ontimeupdate":
            case "onvolumechange":
            case "onwaiting":
            case "ontoggle":
                return true;
            default:
                return false;
        }
    }

    var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    * https://github.com/LCluber/Wee.js
    */

    var Dom = function () {
        function Dom() {
            _classCallCheck$1(this, Dom);
        }

        _createClass$1(Dom, null, [{
            key: "scrollToBottom",
            value: function scrollToBottom(HtmlElement) {
                HtmlElement.scrollTop = HtmlElement.scrollHeight;
            }
        }, {
            key: "scrollToTop",
            value: function scrollToTop(HtmlElement) {
                HtmlElement.scrollTop = 0;
            }
        }, {
            key: "findById",
            value: function findById(id) {
                return document.getElementById(id);
            }
        }, {
            key: "findByClass",
            value: function findByClass(className) {
                return this.arrayFrom(document.getElementsByClassName(className));
            }
        }, {
            key: "findByTag",
            value: function findByTag(tagName) {
                return this.arrayFrom(document.getElementsByTagName(tagName));
            }
        }, {
            key: "showElement",
            value: function showElement(element) {
                return this.styleElement(element, "display", "block");
            }
        }, {
            key: "hideElement",
            value: function hideElement(element) {
                return this.styleElement(element, "display", "none");
            }
        }, {
            key: "styleElement",
            value: function styleElement(element, parameter, value) {
                var htmlelement = this.checkElement(element);
                if (htmlelement) {
                    htmlelement.style[parameter] = value;
                }
                return htmlelement;
            }
        }, {
            key: "showOverflow",
            value: function showOverflow() {
                document.body.style.overflow = "visible";
            }
        }, {
            key: "hideOverflow",
            value: function hideOverflow() {
                document.body.style.overflow = "hidden";
            }
        }, {
            key: "getInputValue",
            value: function getInputValue(element) {
                var htmlelement = this.checkElement(element);
                if (htmlelement) {
                    return htmlelement.value;
                }
                return null;
            }
        }, {
            key: "clearInputValue",
            value: function clearInputValue(element) {
                var htmlelement = this.checkElement(element);
                if (htmlelement) {
                    htmlelement.value = "";
                }
                return htmlelement;
            }
        }, {
            key: "focusOn",
            value: function focusOn(element) {
                var htmlelement = this.checkElement(element);
                if (htmlelement) {
                    htmlelement.focus();
                }
                return htmlelement;
            }
        }, {
            key: "addHTMLElement",
            value: function addHTMLElement(parentElement, childElementType, childElementAttributes) {
                var parentHtmlElement = this.checkElement(parentElement);
                if (parentHtmlElement) {
                    var newElement = document.createElement(childElementType);
                    if (childElementAttributes) {
                        Object.keys(childElementAttributes).forEach(function (key) {
                            if (key === "textContent" || key === "innerHTML" || isHtmlEventAttribute(key)) {
                                newElement[key] = childElementAttributes[key];
                            } else {
                                newElement.setAttribute(key, childElementAttributes[key]);
                            }
                        });
                    }
                    parentHtmlElement.appendChild(newElement);
                    return newElement;
                }
                return null;
            }
        }, {
            key: "clearHTMLElement",
            value: function clearHTMLElement(element) {
                var htmlelement = this.checkElement(element);
                if (htmlelement) {
                    htmlelement.innerHTML = "";
                }
                return htmlelement;
            }
        }, {
            key: "arrayFrom",
            value: function arrayFrom(htmlCollection) {
                var elements = [];
                for (var i = 0; i < htmlCollection.length; i++) {
                    elements.push(htmlCollection[i]);
                }
                return elements;
            }
        }, {
            key: "checkElement",
            value: function checkElement(element) {
                if (isString(element)) {
                    return this.findById(element);
                }
                return element;
            }
        }]);

        return Dom;
    }();

    var Binding = function () {
        function Binding(element, property, value) {
            _classCallCheck$1(this, Binding);

            this._value = "";
            this.elements = this.getElements(element);
            this.property = [];
            this.lastProperty = "";
            if (property) {
                this.property = property.split(".");
                this.lastProperty = this.property[this.property.length - 1];
                this.addPropertyToElement();
            }
            this.value = value;
        }

        _createClass$1(Binding, [{
            key: "addPropertyToElement",
            value: function addPropertyToElement() {
                if (this.elements) {
                    for (var j = 0; j < this.elements.length; j++) {
                        for (var i = 0; i < this.property.length - 1; i++) {
                            this.elements[j] = this.elements[j][this.property[i]];
                        }
                    }
                }
            }
        }, {
            key: "update",
            value: function update(value) {
                this.value = value;
            }
        }, {
            key: "updateDom",
            value: function updateDom() {
                if (this.elements) {
                    var str = this._value;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var element = _step.value;

                            if (this.property.length) {
                                if (this.property.length > 1) {
                                    element[this.lastProperty] = str;
                                } else {
                                    element.setAttribute(this.lastProperty, str);
                                }
                            } else {
                                if (element.hasAttribute("value")) {
                                    element.value = str;
                                } else {
                                    var pattern = /<\s*.*[^>]*>(.*?)<\s*.*\s*>/gi;
                                    if (isString(this._value) && str.match(pattern)) {
                                        element.innerHTML = str;
                                    } else {
                                        element.textContent = str;
                                    }
                                }
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
                }
            }
        }, {
            key: "getElements",
            value: function getElements(element) {
                var elements = [];
                if (isArray(element)) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = element[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var elt = _step2.value;

                            if (isHtmlElement(elt)) {
                                elements.push(elt);
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
                } else if (isString(element)) {
                    var htmlElement = Dom.findById(element);
                    if (htmlElement) {
                        elements.push(htmlElement);
                    } else {
                        elements = Dom.findByClass(element);
                    }
                } else if (isHtmlElement(element)) {
                    elements.push(element);
                }
                return elements;
            }
        }, {
            key: "value",
            set: function set(value) {
                this._value = value;
                this.updateDom();
            },
            get: function get() {
                return this._value;
            }
        }]);

        return Binding;
    }();

    var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

    function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    var Utils = function () {
        function Utils() {
            _classCallCheck$2(this, Utils);
        }

        _createClass$2(Utils, null, [{
            key: 'round',
            value: function round(x, decimals) {
                decimals = Math.pow(10, decimals);
                return Math.round(x * decimals) / decimals;
            }
        }, {
            key: 'floor',
            value: function floor(x, decimals) {
                decimals = Math.pow(10, decimals);
                return Math.floor(x * decimals) / decimals;
            }
        }, {
            key: 'ceil',
            value: function ceil(x, decimals) {
                decimals = Math.pow(10, decimals);
                return Math.ceil(x * decimals) / decimals;
            }
        }, {
            key: 'trunc',
            value: function trunc(x, decimals) {
                decimals = Math.pow(10, decimals);
                var v = +x * decimals;
                if (!isFinite(v)) {
                    return v;
                }
                return (v - v % 1) / decimals || (v < 0 ? -0 : v === 0 ? v : 0);
            }
        }, {
            key: 'roundToNearest',
            value: function roundToNearest(x, nearest) {
                return Math.round(x / nearest) * nearest;
            }
        }, {
            key: 'mix',
            value: function mix(x, y, ratio) {
                return (1 - ratio) * x + ratio * y;
            }
        }, {
            key: 'sign',
            value: function sign(x) {
                return x ? x < 0 ? -1 : 1 : 0;
            }
        }, {
            key: 'opposite',
            value: function opposite(x) {
                return -x;
            }
        }, {
            key: 'clamp',
            value: function clamp(x, min, max) {
                return Math.min(Math.max(x, min), max);
            }
        }, {
            key: 'normalize',
            value: function normalize(x, min, max) {
                return (x - min) / (max - min);
            }
        }, {
            key: 'lerp',
            value: function lerp(normal, min, max) {
                return (max - min) * normal + min;
            }
        }, {
            key: 'map',
            value: function map(x, sourceMin, sourceMax, destMin, destMax) {
                return this.lerp(this.normalize(x, sourceMin, sourceMax), destMin, destMax);
            }
        }, {
            key: 'isEven',
            value: function isEven(x) {
                return !(x & 1);
            }
        }, {
            key: 'isOdd',
            value: function isOdd(x) {
                return x & 1;
            }
        }, {
            key: 'isOrigin',
            value: function isOrigin(x) {
                return x === 0 ? true : false;
            }
        }, {
            key: 'isPositive',
            value: function isPositive(x) {
                return x >= 0 ? true : false;
            }
        }, {
            key: 'isNegative',
            value: function isNegative(x) {
                return x < 0 ? true : false;
            }
        }, {
            key: 'contains',
            value: function contains(x, min, max) {
                return x >= min && x <= max;
            }
        }]);

        return Utils;
    }();

    var Trigonometry = function () {
        function Trigonometry() {
            _classCallCheck$2(this, Trigonometry);
        }

        _createClass$2(Trigonometry, null, [{
            key: 'init',
            value: function init() {
                Trigonometry.createRoundedPis();
                Trigonometry.createFactorialArray();
            }
        }, {
            key: 'createRoundedPis',
            value: function createRoundedPis() {
                var decimals = 2;
                this.pi = Utils.round(Math.PI, decimals);
                this.twopi = Utils.round(Math.PI * 2, decimals);
                this.halfpi = Utils.round(Math.PI * 0.5, decimals);
            }
        }, {
            key: 'createFactorialArray',
            value: function createFactorialArray() {
                var maxSin = this.sineLoops[this.sineLoops.length - 1] * 3;
                var maxCos = this.cosineLoops[this.cosineLoops.length - 1] * 2;
                for (var i = 1, f = 1; i <= Math.max(maxSin, maxCos); i++) {
                    f *= this.factorial(i);
                    this.factorialArray.push(f);
                }
            }
        }, {
            key: 'factorial',
            value: function factorial(i) {
                return i > 1 ? i - 1 : 1;
            }
        }, {
            key: 'setSinePrecision',
            value: function setSinePrecision(value) {
                if (value < this.sineLoops.length) {
                    this.sineDecimals = value;
                    return value;
                }
                this.sineDecimals = 2;
                return 2;
            }
        }, {
            key: 'setCosinePrecision',
            value: function setCosinePrecision(value) {
                if (value < Trigonometry.cosineLoops.length) {
                    this.cosineDecimals = value;
                    return value;
                }
                this.cosineDecimals = 2;
                return 2;
            }
        }, {
            key: 'setArctanPrecision',
            value: function setArctanPrecision(value) {
                if (value < Trigonometry.arctanLoops.length) {
                    this.cosineDecimals = value;
                    return value;
                }
                this.arctanDecimals = 2;
                return 2;
            }
        }, {
            key: 'degreeToRadian',
            value: function degreeToRadian(degree) {
                return degree * this.pi / 180;
            }
        }, {
            key: 'radianToDegree',
            value: function radianToDegree(radian) {
                return radian * 180 / this.pi;
            }
        }, {
            key: 'normalizeRadian',
            value: function normalizeRadian(angle) {
                if (angle > this.pi || angle < -this.pi) {
                    return angle - this.twopi * Math.floor((angle + this.pi) / this.twopi);
                }
                return angle;
            }
        }, {
            key: 'sine',
            value: function sine(angle) {
                angle = this.normalizeRadian(angle);
                if (Trigonometry.sineDecimals <= 2 && angle < 0.28 && angle > -0.28) {
                    return angle;
                } else {
                    return this.taylorSerie(3, Trigonometry.sineLoops[this.sineDecimals], angle, angle, true);
                }
            }
        }, {
            key: 'cosine',
            value: function cosine(angle) {
                angle = this.normalizeRadian(angle);
                var squaredAngle = angle * angle;
                if (this.cosineDecimals <= 2 && angle <= 0.5 && angle >= -0.5) {
                    return 1 - squaredAngle * 0.5;
                } else {
                    return this.taylorSerie(2, Trigonometry.cosineLoops[this.cosineDecimals], 1, angle, true);
                }
            }
        }, {
            key: 'arctan2',
            value: function arctan2(x, y) {
                var angle = y / x;
                if (x > 0) {
                    return this.arctan(angle);
                } else if (x < 0) {
                    if (y < 0) {
                        return this.arctan(angle) - this.pi;
                    } else {
                        return this.arctan(angle) + this.pi;
                    }
                } else {
                    if (y < 0) {
                        return -this.halfpi;
                    } else if (y > 0) {
                        return this.halfpi;
                    } else {
                        return false;
                    }
                }
            }
        }, {
            key: 'arctan2Vector2',
            value: function arctan2Vector2(vector2) {
                return this.arctan2(vector2.x, vector2.y);
            }
        }, {
            key: 'arctan',
            value: function arctan(angle) {
                var loops = Trigonometry.arctanLoops[this.arctanDecimals];
                if (angle < 1 && angle > -1) {
                    return this.taylorSerie(3, loops, angle, angle, false);
                } else {
                    if (angle >= 1) {
                        angle = 1 / angle;
                        return -(this.taylorSerie(3, loops, angle, angle, false) - this.halfpi);
                    } else {
                        angle = -1 / angle;
                        return this.taylorSerie(3, loops, angle, angle, false) - this.halfpi;
                    }
                }
            }
        }, {
            key: 'sineEquation',
            value: function sineEquation(amplitude, period, shiftX, shiftY) {
                return amplitude * this.sine(period + shiftX) + shiftY;
            }
        }, {
            key: 'cosineEquation',
            value: function cosineEquation(amplitude, period, shiftX, shiftY) {
                return amplitude * this.cosine(period + shiftX) + shiftY;
            }
        }, {
            key: 'arctanEquation',
            value: function arctanEquation(amplitude, period, shiftX, shiftY) {
                return amplitude * this.arctan(period + shiftX) + shiftY;
            }
        }, {
            key: 'taylorSerie',
            value: function taylorSerie(start, max, x, angle, needFactorial) {
                var squaredAngle = angle * angle;
                var result = x;
                var denominator = 0;
                var sign = -1;
                for (var i = 0; start <= max; start += 2, i++) {
                    x *= squaredAngle;
                    denominator = needFactorial ? this.factorialArray[start] : start;
                    result += x / denominator * sign;
                    sign = Utils.opposite(sign);
                }
                return result;
            }
        }]);

        return Trigonometry;
    }();

    Trigonometry.sineLoops = [9, 11, 13, 15, 17, 18, 19, 21, 23];
    Trigonometry.cosineLoops = [6, 8, 10, 12, 14, 16, 18, 20, 22];
    Trigonometry.arctanLoops = [17, 19, 21, 23, 25, 27, 29, 31, 33];
    Trigonometry.sineDecimals = 2;
    Trigonometry.cosineDecimals = 2;
    Trigonometry.arctanDecimals = 2;
    Trigonometry.factorialArray = [];
    Trigonometry.init();

    var Time = function () {
        function Time() {
            _classCallCheck$2(this, Time);
        }

        _createClass$2(Time, null, [{
            key: 'millisecondToSecond',
            value: function millisecondToSecond(millisecond) {
                return millisecond * 0.001;
            }
        }, {
            key: 'secondToMilliecond',
            value: function secondToMilliecond(second) {
                return second * 1000;
            }
        }, {
            key: 'millisecondToFramePerSecond',
            value: function millisecondToFramePerSecond(millisecond) {
                return 1000 / millisecond;
            }
        }, {
            key: 'framePerSecondToMillisecond',
            value: function framePerSecondToMillisecond(refreshRate) {
                return 1000 / refreshRate;
            }
        }]);

        return Time;
    }();

    var Random = function () {
        function Random() {
            _classCallCheck$2(this, Random);
        }

        _createClass$2(Random, null, [{
            key: 'float',
            value: function float(min, max) {
                return min + Math.random() * (max - min);
            }
        }, {
            key: 'integer',
            value: function integer(min, max) {
                return Math.floor(min + Math.random() * (max - min + 1));
            }
        }, {
            key: 'distribution',
            value: function distribution(min, max, iterations) {
                var total = 0;
                for (var i = 0; i < iterations; i++) {
                    total += this.float(min, max);
                }
                return total / iterations;
            }
        }, {
            key: 'pick',
            value: function pick(value1, value2) {
                return Math.random() < 0.5 ? value1 : value2;
            }
        }]);

        return Random;
    }();

    var NumArray = function () {
        function NumArray() {
            _classCallCheck$2(this, NumArray);
        }

        _createClass$2(NumArray, null, [{
            key: 'min',
            value: function min(array) {
                return Math.min.apply(Math, _toConsumableArray(array));
            }
        }, {
            key: 'max',
            value: function max(array) {
                return Math.max.apply(Math, _toConsumableArray(array));
            }
        }, {
            key: 'sum',
            value: function sum(array) {
                return array.reduce(function (a, b) {
                    return a + b;
                }, 0);
            }
        }, {
            key: 'multiply',
            value: function multiply(array) {
                return array.reduce(function (a, b) {
                    return a * b;
                }, 0);
            }
        }, {
            key: 'average',
            value: function average(array, length) {
                return NumArray.sum(array) / length;
            }
        }]);

        return NumArray;
    }();

    var Bezier = function () {
        function Bezier() {
            _classCallCheck$2(this, Bezier);
        }

        _createClass$2(Bezier, null, [{
            key: 'quadratic',
            value: function quadratic(p0, p1, p2, t) {
                var oneMinusT = 1 - t;
                return Math.pow(oneMinusT, 2) * p0 + oneMinusT * 2 * t * p1 + t * t * p2;
            }
        }, {
            key: 'cubic',
            value: function cubic(p0, p1, p2, p3, t) {
                var oneMinusT = 1 - t;
                var tByT = t * t;
                return Math.pow(oneMinusT, 3) * p0 + Math.pow(oneMinusT, 2) * 3 * t * p1 + oneMinusT * 3 * tByT * p2 + tByT * t * p3;
            }
        }]);

        return Bezier;
    }();

    var Vector2 = function () {
        function Vector2(x, y) {
            _classCallCheck$2(this, Vector2);

            this.x = x || 0.0;
            this.y = y || 0.0;
        }

        _createClass$2(Vector2, [{
            key: 'isOrigin',
            value: function isOrigin() {
                return Utils.isOrigin(this.x) && Utils.isOrigin(this.y) ? true : false;
            }
        }, {
            key: 'isNotOrigin',
            value: function isNotOrigin() {
                return !Utils.isOrigin(this.x) || !Utils.isOrigin(this.y) ? true : false;
            }
        }, {
            key: 'isPositive',
            value: function isPositive() {
                return Utils.isPositive(this.x) && Utils.isPositive(this.y) ? true : false;
            }
        }, {
            key: 'isNegative',
            value: function isNegative() {
                return Utils.isNegative(this.x) && Utils.isNegative(this.y) ? true : false;
            }
        }, {
            key: 'fromArray',
            value: function fromArray(array, offset) {
                if (offset === undefined) {
                    offset = 0;
                }
                this.x = array[offset];
                this.y = array[offset + 1];
                return this;
            }
        }, {
            key: 'toArray',
            value: function toArray() {
                return [this.x, this.y];
            }
        }, {
            key: 'toString',
            value: function toString() {
                return '(x = ' + this.x + ';y = ' + this.y + ')';
            }
        }, {
            key: 'set',
            value: function set(x, y) {
                this.x = x;
                this.y = y;
                return this;
            }
        }, {
            key: 'clone',
            value: function clone() {
                return new Vector2(this.x, this.y);
            }
        }, {
            key: 'copy',
            value: function copy(vector2) {
                this.x = vector2.x;
                this.y = vector2.y;
                return this;
            }
        }, {
            key: 'origin',
            value: function origin() {
                this.x = 0.0;
                this.y = 0.0;
                return this;
            }
        }, {
            key: 'setAngle',
            value: function setAngle(angle) {
                if (angle) {
                    var length = this.getMagnitude();
                    this.x = Trigonometry.cosine(angle) * length;
                    this.y = Trigonometry.sine(angle) * length;
                }
                return this;
            }
        }, {
            key: 'getAngle',
            value: function getAngle() {
                return Math.atan2(this.y, this.x);
            }
        }, {
            key: 'getMagnitude',
            value: function getMagnitude() {
                return Math.sqrt(this.getSquaredMagnitude());
            }
        }, {
            key: 'getSquaredMagnitude',
            value: function getSquaredMagnitude() {
                return this.x * this.x + this.y * this.y;
            }
        }, {
            key: 'getDistance',
            value: function getDistance(vector2) {
                this.subtract(vector2);
                var magnitude = this.getMagnitude();
                this.add(vector2);
                return magnitude;
            }
        }, {
            key: 'getSquaredDistance',
            value: function getSquaredDistance(vector2) {
                this.subtract(vector2);
                var squaredMagnitude = this.getSquaredMagnitude();
                this.add(vector2);
                return squaredMagnitude;
            }
        }, {
            key: 'quadraticBezier',
            value: function quadraticBezier(p0, p1, p2, t) {
                this.x = Bezier.quadratic(p0.x, p1.x, p2.x, t);
                this.y = Bezier.quadratic(p0.y, p1.y, p2.y, t);
                return this;
            }
        }, {
            key: 'cubicBezier',
            value: function cubicBezier(p0, p1, p2, p3, t) {
                this.x = Bezier.cubic(p0.x, p1.x, p2.x, p3.x, t);
                this.y = Bezier.cubic(p0.y, p1.y, p2.y, p3.y, t);
                return this;
            }
        }, {
            key: 'add',
            value: function add(vector2) {
                this.x += vector2.x;
                this.y += vector2.y;
                return this;
            }
        }, {
            key: 'addScalar',
            value: function addScalar(scalar) {
                this.x += scalar;
                this.y += scalar;
                return this;
            }
        }, {
            key: 'addScaledVector',
            value: function addScaledVector(vector2, scalar) {
                this.x += vector2.x * scalar;
                this.y += vector2.y * scalar;
                return this;
            }
        }, {
            key: 'addVectors',
            value: function addVectors(v1, v2) {
                this.x = v1.x + v2.x;
                this.y = v1.y + v2.y;
                return this;
            }
        }, {
            key: 'subtract',
            value: function subtract(vector2) {
                this.x -= vector2.x;
                this.y -= vector2.y;
                return this;
            }
        }, {
            key: 'subtractScalar',
            value: function subtractScalar(scalar) {
                this.x -= scalar;
                this.y -= scalar;
                return this;
            }
        }, {
            key: 'subtractScaledVector',
            value: function subtractScaledVector(vector2, scalar) {
                this.x -= vector2.x * scalar;
                this.y -= vector2.y * scalar;
                return this;
            }
        }, {
            key: 'subtractVectors',
            value: function subtractVectors(v1, v2) {
                this.x = v1.x - v2.x;
                this.y = v1.y - v2.y;
                return this;
            }
        }, {
            key: 'scale',
            value: function scale(value) {
                this.x *= value;
                this.y *= value;
                return this;
            }
        }, {
            key: 'scaleVector',
            value: function scaleVector(v1, value) {
                this.x = v1.x * value;
                this.y = v1.y * value;
                return this;
            }
        }, {
            key: 'multiply',
            value: function multiply(vector2) {
                this.x *= vector2.x;
                this.y *= vector2.y;
                return this;
            }
        }, {
            key: 'multiplyScaledVector',
            value: function multiplyScaledVector(vector2, scalar) {
                this.x *= vector2.x * scalar;
                this.y *= vector2.y * scalar;
                return this;
            }
        }, {
            key: 'multiplyVectors',
            value: function multiplyVectors(v1, v2) {
                this.x = v1.x * v2.x;
                this.y = v1.y * v2.y;
                return this;
            }
        }, {
            key: 'divide',
            value: function divide(vector2) {
                this.x /= vector2.x;
                this.y /= vector2.y;
                return this;
            }
        }, {
            key: 'divideScaledVector',
            value: function divideScaledVector(vector2, scalar) {
                this.x /= vector2.x * scalar;
                this.y /= vector2.y * scalar;
                return this;
            }
        }, {
            key: 'divideVectors',
            value: function divideVectors(v1, v2) {
                this.x = v1.x / v2.x;
                this.y = v1.y / v2.y;
                return this;
            }
        }, {
            key: 'halve',
            value: function halve() {
                this.x *= 0.5;
                this.y *= 0.5;
                return this;
            }
        }, {
            key: 'max',
            value: function max(vector2) {
                this.x = Math.max(this.x, vector2.x);
                this.y = Math.max(this.y, vector2.y);
                return this;
            }
        }, {
            key: 'min',
            value: function min(vector2) {
                this.x = Math.min(this.x, vector2.x);
                this.y = Math.min(this.y, vector2.y);
                return this;
            }
        }, {
            key: 'maxScalar',
            value: function maxScalar(scalar) {
                this.x = Math.max(this.x, scalar);
                this.y = Math.max(this.y, scalar);
                return this;
            }
        }, {
            key: 'minScalar',
            value: function minScalar(scalar) {
                this.x = Math.min(this.x, scalar);
                this.y = Math.min(this.y, scalar);
                return this;
            }
        }, {
            key: 'maxAxis',
            value: function maxAxis() {
                return this.y > this.x ? 'y' : 'x';
            }
        }, {
            key: 'minAxis',
            value: function minAxis() {
                return this.y < this.x ? 'y' : 'x';
            }
        }, {
            key: 'setOppositeAxis',
            value: function setOppositeAxis(axis, value) {
                if (axis === 'y') {
                    this.x = value;
                } else {
                    this.y = value;
                }
                return this;
            }
        }, {
            key: 'normalize',
            value: function normalize() {
                var length = this.getMagnitude();
                if (length && length != 1) {
                    this.scale(1 / length);
                }
                return this;
            }
        }, {
            key: 'normalizeVector',
            value: function normalizeVector(v) {
                this.copy(v);
                return this.normalize();
            }
        }, {
            key: 'absolute',
            value: function absolute() {
                this.x = Math.abs(this.x);
                this.y = Math.abs(this.y);
                return this;
            }
        }, {
            key: 'absoluteVector',
            value: function absoluteVector(v) {
                this.x = Math.abs(v.x);
                this.y = Math.abs(v.y);
                return this;
            }
        }, {
            key: 'opposite',
            value: function opposite() {
                this.x = -this.x;
                this.y = -this.y;
                return this;
            }
        }, {
            key: 'oppositeVector',
            value: function oppositeVector(v) {
                this.x = -v.x;
                this.y = -v.y;
                return this;
            }
        }, {
            key: 'clamp',
            value: function clamp(rectangle) {
                this.x = Utils.clamp(this.x, rectangle.topLeftCorner.x, rectangle.bottomRightCorner.x);
                this.y = Utils.clamp(this.y, rectangle.topLeftCorner.y, rectangle.bottomRightCorner.y);
                return this;
            }
        }, {
            key: 'lerp',
            value: function lerp(normal, min, max) {
                this.x = Utils.lerp(normal, min.x, max.x);
                this.y = Utils.lerp(normal, min.y, max.y);
                return this;
            }
        }, {
            key: 'dotProduct',
            value: function dotProduct(vector2) {
                return this.x * vector2.x + this.y * vector2.y;
            }
        }]);

        return Vector2;
    }();

    var Circle = function () {
        function Circle(positionX, positionY, radius) {
            _classCallCheck$2(this, Circle);

            this.shape = 'circle';
            this._radius = 0.0;
            this._diameter = 0.0;
            this.position = new Vector2(positionX, positionY);
            this.radius = radius;
        }

        _createClass$2(Circle, [{
            key: 'clone',
            value: function clone() {
                return new Circle(this.position.x, this.position.y, this.radius);
            }
        }, {
            key: 'copy',
            value: function copy(circle) {
                this.position.copy(circle.position);
                this.radius = circle.radius;
            }
        }, {
            key: 'set',
            value: function set(positionX, positionY, radius) {
                this.position.set(positionX, positionY);
                this.radius = radius;
            }
        }, {
            key: 'setPositionXY',
            value: function setPositionXY(positionX, positionY) {
                this.position.set(positionX, positionY);
            }
        }, {
            key: 'setPositionFromVector',
            value: function setPositionFromVector(position) {
                this.position.copy(position);
            }
        }, {
            key: 'scale',
            value: function scale(scalar) {
                this.radius *= scalar;
            }
        }, {
            key: 'contains',
            value: function contains(vector) {
                return vector.getSquaredDistance(this.position) <= this.radius * this.radius;
            }
        }, {
            key: 'draw',
            value: function draw(context, fillColor, strokeColor, strokeWidth) {
                context.beginPath();
                context.arc(this.position.x, this.position.y, this.radius, 0, Trigonometry.twopi, false);
                if (fillColor) {
                    context.fillStyle = fillColor;
                    context.fill();
                }
                if (strokeColor) {
                    context.strokeStyle = strokeColor;
                    context.lineWidth = strokeWidth;
                    context.stroke();
                }
            }
        }, {
            key: 'radius',
            set: function set(radius) {
                this._radius = radius;
                this._diameter = this._radius * 2;
            },
            get: function get() {
                return this._radius;
            }
        }, {
            key: 'diameter',
            set: function set(diameter) {
                this._diameter = diameter;
                this._radius = this._diameter * 0.5;
            },
            get: function get() {
                return this._diameter;
            }
        }]);

        return Circle;
    }();

    var Rectangle = function () {
        function Rectangle(positionX, positionY, sizeX, sizeY) {
            _classCallCheck$2(this, Rectangle);

            this.shape = 'aabb';
            this.size = new Vector2(sizeX, sizeY);
            this.halfSize = new Vector2();
            this.setHalfSize();
            this.position = new Vector2(positionX, positionY);
            this.topLeftCorner = new Vector2(positionX - this.halfSize.x, positionY - this.halfSize.y);
            this.bottomRightCorner = new Vector2(positionX + this.halfSize.x, positionY + this.halfSize.y);
        }

        _createClass$2(Rectangle, [{
            key: 'clone',
            value: function clone() {
                return new Rectangle(this.position.x, this.position.y, this.size.x, this.size.y);
            }
        }, {
            key: 'copy',
            value: function copy(rectangle) {
                this.setSizeFromVector(rectangle.size);
                this.setPositionFromVector(rectangle.position);
            }
        }, {
            key: 'set',
            value: function set(positionX, positionY, sizeX, sizeY) {
                this.setSizeXY(sizeX, sizeY);
                this.setPositionXY(positionX, positionY);
            }
        }, {
            key: 'setPositionX',
            value: function setPositionX(x) {
                this.setPosition('x', x);
            }
        }, {
            key: 'setPositionY',
            value: function setPositionY(y) {
                this.setPosition('y', y);
            }
        }, {
            key: 'setPosition',
            value: function setPosition(property, value) {
                this.position[property] = value;
                this.topLeftCorner[property] = value - this.halfSize[property];
                this.bottomRightCorner[property] = value + this.halfSize[property];
            }
        }, {
            key: 'setPositionXY',
            value: function setPositionXY(positionX, positionY) {
                this.position.set(positionX, positionY);
                this.setCorners();
            }
        }, {
            key: 'setPositionFromVector',
            value: function setPositionFromVector(position) {
                this.position.copy(position);
                this.setCorners();
            }
        }, {
            key: 'setSizeX',
            value: function setSizeX(width) {
                this.setSize('x', width);
            }
        }, {
            key: 'setSizeY',
            value: function setSizeY(height) {
                this.setSize('y', height);
            }
        }, {
            key: 'setSize',
            value: function setSize(property, value) {
                this.size[property] = value;
                this.setHalfSize();
                this.topLeftCorner[property] = this.position[property] - this.halfSize[property];
                this.bottomRightCorner[property] = this.position[property] + this.halfSize[property];
            }
        }, {
            key: 'setSizeXY',
            value: function setSizeXY(width, height) {
                this.size.set(width, height);
                this.setHalfSize();
                this.setCorners();
            }
        }, {
            key: 'setSizeFromVector',
            value: function setSizeFromVector(size) {
                this.size.copy(size);
                this.setHalfSize();
                this.setCorners();
            }
        }, {
            key: 'setCorners',
            value: function setCorners() {
                this.topLeftCorner.set(this.position.x - this.halfSize.x, this.position.y - this.halfSize.y);
                this.bottomRightCorner.set(this.position.x + this.halfSize.x, this.position.y + this.halfSize.y);
            }
        }, {
            key: 'setHalfSize',
            value: function setHalfSize() {
                this.halfSize.copy(this.size);
                this.halfSize.halve();
            }
        }, {
            key: 'contains',
            value: function contains(vector) {
                return Utils.contains(vector.x, this.topLeftCorner.x, this.bottomRightCorner.x) && Utils.contains(vector.y, this.topLeftCorner.y, this.bottomRightCorner.y);
            }
        }, {
            key: 'draw',
            value: function draw(context, fillColor, strokeColor, strokeWidth) {
                context.beginPath();
                context.rect(this.topLeftCorner.x, this.topLeftCorner.y, this.size.x, this.size.y);
                if (fillColor) {
                    context.fillStyle = fillColor;
                    context.fill();
                }
                if (strokeColor) {
                    context.strokeStyle = strokeColor;
                    context.lineWidth = strokeWidth;
                    context.stroke();
                }
            }
        }]);

        return Rectangle;
    }();

    var Vector3 = function () {
        function Vector3(x, y, z) {
            _classCallCheck$2(this, Vector3);

            this.x = x || 0.0;
            this.y = y || 0.0;
            this.z = z || 0.0;
        }

        _createClass$2(Vector3, [{
            key: 'fromArray',
            value: function fromArray(array, offset) {
                if (offset === undefined) {
                    offset = 0;
                }
                this.x = array[offset];
                this.y = array[offset + 1];
                this.z = array[offset + 2];
                return this;
            }
        }, {
            key: 'toArray',
            value: function toArray() {
                return [this.x, this.y, this.z];
            }
        }, {
            key: 'toString',
            value: function toString() {
                return '(x = ' + this.x + ';y = ' + this.y + ';z = ' + this.z + ')';
            }
        }, {
            key: 'set',
            value: function set(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
                return this;
            }
        }, {
            key: 'clone',
            value: function clone() {
                return new Vector3(this.x, this.y, this.z);
            }
        }, {
            key: 'copy',
            value: function copy(vector3) {
                this.x = vector3.x;
                this.y = vector3.y;
                this.z = vector3.z;
                return this;
            }
        }, {
            key: 'origin',
            value: function origin() {
                this.x = 0.0;
                this.y = 0.0;
                this.z = 0.0;
                return this;
            }
        }, {
            key: 'getMagnitude',
            value: function getMagnitude() {
                return Math.sqrt(this.getSquaredMagnitude());
            }
        }, {
            key: 'getSquaredMagnitude',
            value: function getSquaredMagnitude() {
                return this.x * this.x + this.y * this.y + this.z * this.z;
            }
        }, {
            key: 'getDistance',
            value: function getDistance(vector3) {
                this.subtract(vector3);
                var magnitude = this.getMagnitude();
                this.add(vector3);
                return magnitude;
            }
        }, {
            key: 'getSquaredDistance',
            value: function getSquaredDistance(vector3) {
                this.subtract(vector3);
                var squaredMagnitude = this.getSquaredMagnitude();
                this.add(vector3);
                return squaredMagnitude;
            }
        }, {
            key: 'add',
            value: function add(vector3) {
                this.x += vector3.x;
                this.y += vector3.y;
                this.z += vector3.z;
                return this;
            }
        }, {
            key: 'addScalar',
            value: function addScalar(scalar) {
                this.x += scalar;
                this.y += scalar;
                this.z += scalar;
                return this;
            }
        }, {
            key: 'addScaledVector',
            value: function addScaledVector(vector3, scalar) {
                this.x += vector3.x * scalar;
                this.y += vector3.y * scalar;
                this.z += vector3.z * scalar;
                return this;
            }
        }, {
            key: 'addVectors',
            value: function addVectors(v1, v2) {
                this.x = v1.x + v2.x;
                this.y = v1.y + v2.y;
                this.z = v1.z + v2.z;
                return this;
            }
        }, {
            key: 'subtract',
            value: function subtract(vector3) {
                this.x -= vector3.x;
                this.y -= vector3.y;
                this.z -= vector3.z;
                return this;
            }
        }, {
            key: 'subtractScalar',
            value: function subtractScalar(scalar) {
                this.x -= scalar;
                this.y -= scalar;
                this.z -= scalar;
                return this;
            }
        }, {
            key: 'subtractScaledVector',
            value: function subtractScaledVector(vector3, scalar) {
                this.x -= vector3.x * scalar;
                this.y -= vector3.y * scalar;
                this.z -= vector3.z * scalar;
                return this;
            }
        }, {
            key: 'subtractVectors',
            value: function subtractVectors(v1, v2) {
                this.x = v1.x - v2.x;
                this.y = v1.y - v2.y;
                this.z = v1.z - v2.z;
                return this;
            }
        }, {
            key: 'scale',
            value: function scale(value) {
                this.x *= value;
                this.y *= value;
                this.z *= value;
                return this;
            }
        }, {
            key: 'multiply',
            value: function multiply(vector3) {
                this.x *= vector3.x;
                this.y *= vector3.y;
                this.z *= vector3.z;
                return this;
            }
        }, {
            key: 'multiplyScaledVector',
            value: function multiplyScaledVector(vector3, scalar) {
                this.x *= vector3.x * scalar;
                this.y *= vector3.y * scalar;
                this.z *= vector3.z * scalar;
                return this;
            }
        }, {
            key: 'multiplyVectors',
            value: function multiplyVectors(v1, v2) {
                this.x = v1.x * v2.x;
                this.y = v1.y * v2.y;
                this.z = v1.z * v2.z;
                return this;
            }
        }, {
            key: 'divide',
            value: function divide(vector3) {
                this.x /= vector3.x;
                this.y /= vector3.y;
                this.z /= vector3.z;
                return this;
            }
        }, {
            key: 'divideScaledVector',
            value: function divideScaledVector(vector3, scalar) {
                this.x /= vector3.x * scalar;
                this.y /= vector3.y * scalar;
                this.z /= vector3.z * scalar;
                return this;
            }
        }, {
            key: 'divideVectors',
            value: function divideVectors(v1, v2) {
                this.x = v1.x / v2.x;
                this.y = v1.y / v2.y;
                this.z = v1.z / v2.z;
                return this;
            }
        }, {
            key: 'halve',
            value: function halve() {
                this.x *= 0.5;
                this.y *= 0.5;
                this.z *= 0.5;
                return this;
            }
        }, {
            key: 'max',
            value: function max(vector3) {
                this.x = Math.max(this.x, vector3.x);
                this.y = Math.max(this.y, vector3.y);
                this.z = Math.max(this.z, vector3.z);
                return this;
            }
        }, {
            key: 'min',
            value: function min(vector3) {
                this.x = Math.min(this.x, vector3.x);
                this.y = Math.min(this.y, vector3.y);
                this.z = Math.min(this.z, vector3.z);
                return this;
            }
        }, {
            key: 'maxScalar',
            value: function maxScalar(scalar) {
                this.x = Math.max(this.x, scalar);
                this.y = Math.max(this.y, scalar);
                this.z = Math.max(this.z, scalar);
                return this;
            }
        }, {
            key: 'minScalar',
            value: function minScalar(scalar) {
                this.x = Math.min(this.x, scalar);
                this.y = Math.min(this.y, scalar);
                this.z = Math.min(this.z, scalar);
                return this;
            }
        }, {
            key: 'normalize',
            value: function normalize() {
                var length = this.getMagnitude();
                if (length && length != 1) {
                    this.scale(1 / length);
                }
                return this;
            }
        }, {
            key: 'dotProduct',
            value: function dotProduct(vector3) {
                return this.x * vector3.x + this.y * vector3.y + this.z * vector3.z;
            }
        }, {
            key: 'cross',
            value: function cross(vector3) {
                var x = this.x,
                    y = this.y,
                    z = this.z;
                this.x = y * vector3.z - z * vector3.y;
                this.y = z * vector3.x - x * vector3.z;
                this.z = x * vector3.y - y * vector3.x;
                return this;
            }
        }, {
            key: 'crossVectors',
            value: function crossVectors(v1, v2) {
                var v1x = v1.x,
                    v1y = v1.y,
                    v1z = v1.z;
                var v2x = v2.x,
                    v2y = v2.y,
                    v2z = v2.z;
                this.x = v1y * v2z - v1z * v2y;
                this.y = v1z * v2x - v1x * v2z;
                this.z = v1x * v2y - v1y * v2x;
                return this;
            }
        }]);

        return Vector3;
    }();

    var Matrix4x3 = function () {
        function Matrix4x3(x1, x2, x3, y1, y2, y3, z1, z2, z3, t1, t2, t3) {
            _classCallCheck$2(this, Matrix4x3);

            this.m = new Float32Array(16);
            this.xAxis = new Vector3();
            this.yAxis = new Vector3();
            this.zAxis = new Vector3();
            this.make(x1, x2, x3, y1, y2, y3, z1, z2, z3, t1, t2, t3);
        }

        _createClass$2(Matrix4x3, [{
            key: 'make',
            value: function make(x1, x2, x3, y1, y2, y3, z1, z2, z3, t1, t2, t3) {
                this.m[0] = x1 || 0.0;
                this.m[1] = x2 || 0.0;
                this.m[2] = x3 || 0.0;
                this.m[3] = 0.0;
                this.m[4] = y1 || 0.0;
                this.m[5] = y2 || 0.0;
                this.m[6] = y3 || 0.0;
                this.m[7] = 0.0;
                this.m[8] = z1 || 0.0;
                this.m[9] = z2 || 0.0;
                this.m[10] = z3 || 0.0;
                this.m[11] = 0.0;
                this.m[12] = t1 || 0.0;
                this.m[13] = t2 || 0.0;
                this.m[14] = t3 || 0.0;
                this.m[15] = 1.0;
            }
        }, {
            key: 'copy',
            value: function copy(matrix4x3) {
                var m = matrix4x3.m;
                this.make(m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10], m[12], m[13], m[14]);
                return this;
            }
        }, {
            key: 'toArray',
            value: function toArray() {
                return this.m;
            }
        }, {
            key: 'toString',
            value: function toString() {
                return '(' + this.m[0] + ',' + this.m[1] + ',' + this.m[2] + ',' + this.m[3] + ';' + this.m[4] + ',' + this.m[5] + ',' + this.m[6] + ',' + this.m[7] + ';' + this.m[8] + ',' + this.m[9] + ',' + this.m[10] + ',' + this.m[11] + ';' + this.m[12] + ',' + this.m[13] + ',' + this.m[14] + ',' + this.m[15] + ')';
            }
        }, {
            key: 'identity',
            value: function identity() {
                this.make(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0);
                return this;
            }
        }, {
            key: 'scale',
            value: function scale(vector3) {
                this.make(vector3.x, 0.0, 0.0, 0.0, vector3.y, 0.0, 0.0, 0.0, vector3.z, 0.0, 0.0, 0.0);
                return this;
            }
        }, {
            key: 'rotateX',
            value: function rotateX(angle) {
                var cos = Trigonometry.cosine(angle);
                var sin = Trigonometry.sine(angle);
                this.make(1.0, 0.0, 0.0, 0.0, cos, sin, 0.0, -sin, cos, 0.0, 0.0, 0.0);
                return this;
            }
        }, {
            key: 'rotateY',
            value: function rotateY(angle) {
                var cos = Trigonometry.cosine(angle);
                var sin = Trigonometry.sine(angle);
                this.make(cos, 0.0, -sin, 0.0, 1.0, 0.0, sin, 0.0, cos, 0.0, 0.0, 0.0);
                return this;
            }
        }, {
            key: 'rotateZ',
            value: function rotateZ(angle) {
                var cos = Trigonometry.cosine(angle);
                var sin = Trigonometry.sine(angle);
                this.make(cos, sin, 0.0, -sin, cos, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0);
                return this;
            }
        }, {
            key: 'translate',
            value: function translate(vector3) {
                this.make(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, vector3.x, vector3.y, vector3.z);
                return this;
            }
        }, {
            key: 'multiply',
            value: function multiply(matrix4x3) {
                var m1 = this.m;
                var m2 = matrix4x3.m;
                this.make(m1[0] * m2[0] + m1[4] * m2[1] + m1[8] * m2[2], m1[1] * m2[0] + m1[5] * m2[1] + m1[9] * m2[2], m1[2] * m2[0] + m1[6] * m2[1] + m1[10] * m2[2], m1[0] * m2[4] + m1[4] * m2[5] + m1[8] * m2[6], m1[1] * m2[4] + m1[5] * m2[5] + m1[9] * m2[6], m1[2] * m2[4] + m1[6] * m2[5] + m1[10] * m2[6], m1[0] * m2[8] + m1[4] * m2[9] + m1[8] * m2[10], m1[1] * m2[8] + m1[5] * m2[9] + m1[9] * m2[10], m1[2] * m2[8] + m1[6] * m2[9] + m1[10] * m2[10], m1[0] * m2[12] + m1[4] * m2[13] + m1[8] * m2[14] + m1[12], m1[1] * m2[12] + m1[5] * m2[13] + m1[9] * m2[14] + m1[13], m1[2] * m2[12] + m1[6] * m2[13] + m1[10] * m2[14] + m1[14]);
                return this;
            }
        }, {
            key: 'lookAtRH',
            value: function lookAtRH(eye, target, up) {
                this.zAxis.subtractVectors(eye, target).normalize();
                this.xAxis.crossVectors(up, this.zAxis).normalize();
                this.yAxis.crossVectors(this.zAxis, this.xAxis);
                this.make(this.xAxis.x, this.yAxis.x, this.zAxis.x, this.xAxis.y, this.yAxis.y, this.zAxis.y, this.xAxis.z, this.yAxis.z, this.zAxis.z, -this.xAxis.dotProduct(eye), -this.yAxis.dotProduct(eye), -this.zAxis.dotProduct(eye));
                return this;
            }
        }]);

        return Matrix4x3;
    }();

    var Matrix4x4 = function () {
        function Matrix4x4(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, t1, t2, t3, t4) {
            _classCallCheck$2(this, Matrix4x4);

            this.m = new Float32Array(16);
            this.make(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, t1, t2, t3, t4);
        }

        _createClass$2(Matrix4x4, [{
            key: 'make',
            value: function make(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, t1, t2, t3, t4) {
                this.m[0] = x1 || 0.0;
                this.m[1] = x2 || 0.0;
                this.m[2] = x3 || 0.0;
                this.m[3] = x4 || 0.0;
                this.m[4] = y1 || 0.0;
                this.m[5] = y2 || 0.0;
                this.m[6] = y3 || 0.0;
                this.m[7] = y4 || 0.0;
                this.m[8] = z1 || 0.0;
                this.m[9] = z2 || 0.0;
                this.m[10] = z3 || 0.0;
                this.m[11] = z4 || 0.0;
                this.m[12] = t1 || 0.0;
                this.m[13] = t2 || 0.0;
                this.m[14] = t3 || 0.0;
                this.m[15] = t4 || 0.0;
            }
        }, {
            key: 'copy',
            value: function copy(matrix4x4) {
                var m = matrix4x4.m;
                this.make(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]);
                return this;
            }
        }, {
            key: 'toArray',
            value: function toArray() {
                return this.m;
            }
        }, {
            key: 'toString',
            value: function toString() {
                return '(' + this.m[0] + ',' + this.m[1] + ',' + this.m[2] + ',' + this.m[3] + ';' + this.m[4] + ',' + this.m[5] + ',' + this.m[6] + ',' + this.m[7] + ';' + this.m[8] + ',' + this.m[9] + ',' + this.m[10] + ',' + this.m[11] + ';' + this.m[12] + ',' + this.m[13] + ',' + this.m[14] + ',' + this.m[15] + ')';
            }
        }, {
            key: 'identity',
            value: function identity() {
                this.make(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
                return this;
            }
        }, {
            key: 'scale',
            value: function scale(vector3) {
                this.make(vector3.x, 0.0, 0.0, 0.0, 0.0, vector3.y, 0.0, 0.0, 0.0, 0.0, vector3.z, 0.0, 0.0, 0.0, 0.0, 1.0);
                return this;
            }
        }, {
            key: 'rotateX',
            value: function rotateX(angle) {
                var cos = Trigonometry.cosine(angle);
                var sin = Trigonometry.sine(angle);
                this.make(1.0, 0.0, 0.0, 0.0, 0.0, cos, sin, 0.0, 0.0, -sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
                return this;
            }
        }, {
            key: 'rotateY',
            value: function rotateY(angle) {
                var cos = Trigonometry.cosine(angle);
                var sin = Trigonometry.sine(angle);
                this.make(cos, 0.0, -sin, 0.0, 0.0, 1.0, 0.0, 0.0, sin, 0.0, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
                return this;
            }
        }, {
            key: 'rotateZ',
            value: function rotateZ(angle) {
                var cos = Trigonometry.cosine(angle);
                var sin = Trigonometry.sine(angle);
                this.make(cos, sin, 0.0, 0.0, -sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
                return this;
            }
        }, {
            key: 'translate',
            value: function translate(vector3) {
                this.make(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, vector3.x, vector3.y, vector3.z, 1.0);
                return this;
            }
        }, {
            key: 'multiply',
            value: function multiply(matrix4x4) {
                var m1 = this.m;
                var m2 = matrix4x4.m;
                this.make(m1[0] * m2[0] + m1[4] * m2[1] + m1[8] * m2[2], m1[1] * m2[0] + m1[5] * m2[1] + m1[9] * m2[2], m1[2] * m2[0] + m1[6] * m2[1] + m1[10] * m2[2], 0.0, m1[0] * m2[4] + m1[4] * m2[5] + m1[8] * m2[6], m1[1] * m2[4] + m1[5] * m2[5] + m1[9] * m2[6], m1[2] * m2[4] + m1[6] * m2[5] + m1[10] * m2[6], 0.0, m1[0] * m2[8] + m1[4] * m2[9] + m1[8] * m2[10], m1[1] * m2[8] + m1[5] * m2[9] + m1[9] * m2[10], m1[2] * m2[8] + m1[6] * m2[9] + m1[10] * m2[10], 0.0, m1[0] * m2[12] + m1[4] * m2[13] + m1[8] * m2[14] + m1[12], m1[1] * m2[12] + m1[5] * m2[13] + m1[9] * m2[14] + m1[13], m1[2] * m2[12] + m1[6] * m2[13] + m1[10] * m2[14] + m1[14], 1.0);
                return this;
            }
        }, {
            key: 'perspective',
            value: function perspective(fovy, aspect, znear, zfar) {
                var f = Math.tan(Trigonometry.halfpi - 0.5 * fovy * Trigonometry.pi / 180);
                var rangeInv = 1.0 / (znear - zfar);
                this.make(f / aspect, 0.0, 0.0, 0.0, 0.0, f, 0.0, 0.0, 0.0, 0.0, (znear + zfar) * rangeInv, -1.0, 0.0, 0.0, znear * zfar * rangeInv * 2, 0.0);
                return this;
            }
        }, {
            key: 'orthographic',
            value: function orthographic(left, right, top, bottom, near, far) {
                var w = right - left;
                var h = top - bottom;
                var p = far - near;
                var x = (right + left) / w;
                var y = (top + bottom) / h;
                var z = (far + near) / p;
                this.make(2 / w, 0.0, 0.0, 0.0, 0.0, 2 / h, 0.0, 0.0, 0.0, 0.0, -2 / p, 0.0, -x, -y, -z, 1.0);
                return this;
            }
        }]);

        return Matrix4x4;
    }();

    var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    * http://mouettejs.lcluber.com
    */

    var LEVELS$1 = {
        info: { id: 1, name: 'info', color: '#28a745' },
        trace: { id: 2, name: 'trace', color: '#17a2b8' },
        warn: { id: 3, name: 'warn', color: '#ffc107' },
        error: { id: 4, name: 'error', color: '#dc3545' },
        off: { id: 99, name: 'off', color: null }
    };

    function addZero$1(value) {
        return value < 10 ? '0' + value : value;
    }
    function formatDate$1() {
        var now = new Date();
        var date = [addZero$1(now.getMonth() + 1), addZero$1(now.getDate()), now.getFullYear().toString().substr(-2)];
        var time = [addZero$1(now.getHours()), addZero$1(now.getMinutes()), addZero$1(now.getSeconds())];
        return date.join("/") + " " + time.join(":");
    }

    var Message$1 = function () {
        function Message(level, content) {
            _classCallCheck$3(this, Message);

            this.id = level.id;
            this.name = level.name;
            this.color = level.color;
            this.content = content;
            this.date = formatDate$1();
        }

        _createClass$3(Message, [{
            key: 'display',
            value: function display(groupName) {
                console[this.name]('%c[' + groupName + '] ' + this.date + ' : ', 'color:' + this.color + ';', this.content);
            }
        }]);

        return Message;
    }();

    var Group$1 = function () {
        function Group(name, level) {
            _classCallCheck$3(this, Group);

            this.messages = [];
            this.name = name;
            this.messages = [];
            this._level = level;
        }

        _createClass$3(Group, [{
            key: 'info',
            value: function info(message) {
                this.log(LEVELS$1.info, message);
            }
        }, {
            key: 'trace',
            value: function trace(message) {
                this.log(LEVELS$1.trace, message);
            }
        }, {
            key: 'warn',
            value: function warn(message) {
                this.log(LEVELS$1.warn, message);
            }
        }, {
            key: 'error',
            value: function error(message) {
                this.log(LEVELS$1.error, message);
            }
        }, {
            key: 'log',
            value: function log(level, messageContent) {
                var message = new Message$1(level, messageContent);
                this.messages.push(message);
                if (this._level.id <= message.id) {
                    message.display(this.name);
                }
            }
        }, {
            key: 'level',
            set: function set(name) {
                this._level = LEVELS$1.hasOwnProperty(name) ? LEVELS$1[name] : this._level;
            },
            get: function get() {
                return this._level.name;
            }
        }]);

        return Group;
    }();

    var Logger$1 = function () {
        function Logger() {
            _classCallCheck$3(this, Logger);
        }

        _createClass$3(Logger, null, [{
            key: 'setLevel',
            value: function setLevel(name) {
                Logger.level = LEVELS$1.hasOwnProperty(name) ? LEVELS$1[name] : Logger.level;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Logger.groups[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var group = _step.value;

                        group.level = Logger.level.name;
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
            }
        }, {
            key: 'getLevel',
            value: function getLevel() {
                return Logger.level.name;
            }
        }, {
            key: 'getGroup',
            value: function getGroup(name) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Logger.groups[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var group = _step2.value;

                        if (group.name === name) {
                            return group;
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

                return null;
            }
        }, {
            key: 'addGroup',
            value: function addGroup(name) {
                return this.getGroup(name) || this.pushGroup(name);
            }
        }, {
            key: 'pushGroup',
            value: function pushGroup(name) {
                var group = new Group$1(name, Logger.level);
                Logger.groups.push(group);
                return group;
            }
        }]);

        return Logger;
    }();

    Logger$1.level = LEVELS$1.error;
    Logger$1.groups = [];

    function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        _classCallCheck$4(this, FSM);

        this.state = events[0].from;
        this.log = Logger$1.addGroup('Taipan');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            var _loop = function _loop() {
                var event = _step.value;

                if (!_this.hasOwnProperty(event.name)) {
                    _this[event.name] = function () {
                        _this.log.info('- Event ' + event.name + ' triggered');
                        if (_this.state === event.from) {
                            _this.state = event.to;
                            _this.log.info('from ' + event.from + ' to ' + _this.state);
                            return true;
                        }
                        _this.log.warn('Cannot transition from ' + _this.state + ' to ' + event.to);
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

    function isInteger$1(number) {
        var typeCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var int = parseInt(number, 10);
        return typeCheck ? number === int : number == int;
    }
    function isFloat$1(number) {
        var typeCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var moduloCheck = number % 1 !== 0;
        return typeCheck ? Number(number) === number && moduloCheck : Number(number) == number && moduloCheck;
    }
    function isNumber$1(number) {
        return isInteger$1(number) || isFloat$1(number);
    }

    var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    var Clock = function () {
        function Clock() {
            _classCallCheck$5(this, Clock);

            this.fpsArrayLength = 60;
            this.fpsArray = Array(this.fpsArrayLength);
            this.reset();
        }

        _createClass$4(Clock, [{
            key: 'reset',
            value: function reset() {
                this.now = 0;
                this.total = 0;
                this.delta = 0;
                this.ticks = 0;
                this.fpsArray.fill(60);
            }
        }, {
            key: 'start',
            value: function start() {
                this.now = performance.now();
            }
        }, {
            key: 'tick',
            value: function tick(now) {
                this.now = now;
                this.total += this.delta;
                this.fpsArray[this.ticks % 60] = Time.millisecondToFramePerSecond(this.delta);
                this.ticks++;
            }
        }, {
            key: 'computeDelta',
            value: function computeDelta(now) {
                return this.delta = now - this.now;
            }
        }, {
            key: 'computeAverageFPS',
            value: function computeAverageFPS() {
                return NumArray.average(this.fpsArray, this.fpsArrayLength);
            }
        }]);

        return Clock;
    }();

    var Player = function () {
        function Player(callback) {
            _classCallCheck$5(this, Player);

            this.frameId = 0;
            this.minDelta = 0;
            this.clock = new Clock();
            this.callback = callback;
            this.fsm = new FSM([{ name: 'play', from: false, to: true }, { name: 'stop', from: true, to: false }]);
        }

        _createClass$4(Player, [{
            key: 'setMaxRefreshRate',
            value: function setMaxRefreshRate(maxFPS) {
                this.minDelta = isNumber$1(maxFPS) ? Time.framePerSecondToMillisecond(maxFPS) : this.minDelta;
            }
        }, {
            key: 'getDelta',
            value: function getDelta() {
                return Time.millisecondToSecond(this.clock.delta);
            }
        }, {
            key: 'getTotal',
            value: function getTotal() {
                return Time.millisecondToSecond(this.clock.total);
            }
        }, {
            key: 'getFPS',
            value: function getFPS() {
                return this.clock.computeAverageFPS();
            }
        }, {
            key: 'getTicks',
            value: function getTicks() {
                return this.clock.ticks;
            }
        }, {
            key: 'getState',
            value: function getState() {
                return this.fsm.state;
            }
        }, {
            key: 'setScope',
            value: function setScope(scope) {
                this.callback = this.callback.bind(scope);
            }
        }, {
            key: 'play',
            value: function play() {
                var play = this.fsm['play']();
                if (play) {
                    this.startAnimation();
                }
                return play;
            }
        }, {
            key: 'toggle',
            value: function toggle() {
                return this.play() || this.pause();
            }
        }, {
            key: 'pause',
            value: function pause() {
                if (this.fsm['stop']()) {
                    this.stopAnimation();
                }
                return false;
            }
        }, {
            key: 'stop',
            value: function stop() {
                this.fsm['stop']();
                this.clock.reset();
                this.stopAnimation();
            }
        }, {
            key: 'tick',
            value: function tick(now) {
                var nxt = true;
                var delta = this.clock.computeDelta(now);
                if (!this.minDelta || delta >= this.minDelta) {
                    this.clock.tick(now);
                    if (this.callback() === false) nxt = false;
                }
                nxt ? this.requestNewFrame() : this.stop();
            }
        }, {
            key: 'startAnimation',
            value: function startAnimation() {
                this.clock.start();
                this.requestNewFrame();
            }
        }, {
            key: 'stopAnimation',
            value: function stopAnimation() {
                window.cancelAnimationFrame(this.frameId);
            }
        }, {
            key: 'requestNewFrame',
            value: function requestNewFrame() {
                this.frameId = window.requestAnimationFrame(this.tick.bind(this));
            }
        }]);

        return Player;
    }();

    var Progress = function () {
        function Progress(barId, textId) {
            this.rate = 0.0;
            this.total = 0;
            this.percentage = 0.0;
            this.target = 0;
            this.speed = 40;
            this.nbAssets = 0;
            this.barWidth = 0;
            this.running = false;
            this.bar = null;
            this.number = null;
            this.animation = null;
            if (barId) {
                var bar = Dom.findById(barId);
                if (bar) {
                    this.barWidth = bar.clientWidth;
                    var percentBar = bar.children[1];
                    this.bar = percentBar ? new Binding(percentBar, "style.width", "0px") : null;
                    var number = bar.children[0];
                    this.number = number ? new Binding(number, "", 0) : null;
                    this.animation = new Player(this.animateBar);
                    this.animation.setScope(this);
                }
            }
            this.text = textId ? new Binding(textId, "", "Loading") : null;
        }
        Progress.prototype.animateBar = function () {
            return this.running = this.animation ? this.updateBar(this.animation.getDelta()) : false;
        };
        Progress.prototype.start = function () {
            if (this.animation) {
                this.animation.play();
            }
        };
        Progress.prototype.reset = function () {
            this.running = false;
            this.percentage = 0.0;
            if (this.text) {
                this.text.update("Loading");
            }
        };
        Progress.prototype.update = function (text) {
            this.total++;
            this.rate = this.total / this.nbAssets;
            this.target = Math.round(this.rate * 100);
            if (this.text) {
                this.text.update(text);
            }
        };
        Progress.prototype.updateBar = function (delta) {
            this.percentage += this.speed * delta;
            if (this.percentage >= this.target) {
                this.percentage = this.target;
            }
            var flooredPercentage = Utils.floor(this.percentage, 0);
            if (this.bar) {
                this.bar.update(Utils.map(this.percentage, 0, 100, 0, this.barWidth) + "px");
            }
            if (this.number) {
                this.number.update(flooredPercentage + "%");
            }
            if (flooredPercentage === 100) {
                if (this.animation) {
                    this.animation.stop();
                }
                if (this.text) {
                    this.text.update("Loading complete");
                }
                return false;
            }
            return true;
        };
        return Progress;
    }();

    function loadImage(path) {
        var log = Logger.addGroup("Orbis");
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = path;
            img.name = getName(path);
            log.info("xhr processing starting (" + path + ")");
            img.addEventListener("load", function () {
                log.info("xhr (" + path + ") done");
                resolve(img);
            });
            img.addEventListener("error", function () {
                log.error("xhr (" + path + ") failed");
                reject(new Error("xhr (" + path + ") failed"));
            });
        });
    }
    function getName(path) {
        return path.replace(/^.*[\\\/]/, "");
    }

    var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    function isObject$2(object) {
        return object !== null && (typeof object === "undefined" ? "undefined" : _typeof$2(object)) === "object" && !isArray$2(object);
    }
    function isArray$2(array) {
        return array !== null && array.constructor === Array;
    }

    var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /** MIT License
    * 
    * Copyright (c) 2010 Ludovic CLUBER 
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
    * https://github.com/LCluber/Aias.js
    */

    var AudioContext = window.AudioContext || window.webkitAudioContext || false;

    var Method = function () {
        function Method(method, defaultHeaders) {
            _classCallCheck$6(this, Method);

            this.log = Logger.addGroup("Aias");
            this.method = method;
            this.async = true;
            this.noCache = false;
            this.headers = defaultHeaders;
        }

        _createClass$5(Method, [{
            key: 'setHeaders',
            value: function setHeaders(headers) {
                for (var property in headers) {
                    if (headers.hasOwnProperty(property)) {
                        this.headers[property] = headers[property];
                    }
                }
            }
        }, {
            key: 'getHeaders',
            value: function getHeaders() {
                return this.headers;
            }
        }, {
            key: 'call',
            value: function call(url, responseType, data) {
                var _this = this;

                return new Promise(function (resolve, reject) {
                    var http = new XMLHttpRequest();
                    url += _this.noCache ? "?cache=" + new Date().getTime() : "";
                    http.open(_this.method, url, _this.async);
                    http.responseType = responseType === "audiobuffer" ? "arraybuffer" : responseType;
                    _this.setRequestHeaders(http);
                    switch (responseType) {
                        case "json":
                        case "arraybuffer":
                        case "audiobuffer":
                        case "blob":
                            http.onload = function () {
                                if (http.readyState == 4) {
                                    if (http.status == 200) {
                                        var response = http.response;
                                        if (response) {
                                            _this.logInfo(url, http.status, http.statusText);
                                            if (responseType === "audiobuffer") {
                                                if (AudioContext) {
                                                    var audioContext = new AudioContext();
                                                    audioContext.decodeAudioData(response, function (buffer) {
                                                        audioContext.close();
                                                        resolve(buffer);
                                                    }, function (error) {
                                                        _this.log.error("xhr (" + _this.method + ":" + url + ") failed with decodeAudioData error : " + error.message);
                                                        audioContext.close();
                                                        reject({
                                                            status: error.name,
                                                            statusText: error.message
                                                        });
                                                    });
                                                } else {
                                                    _this.log.error("xhr (" + _this.method + ":" + url + ") failed with error : " + "Web Audio API is not supported by your browser.");
                                                    reject({
                                                        status: "Web Audio API not supported by your browser",
                                                        statusText: "Web Audio API is not supported by your browser"
                                                    });
                                                }
                                            } else {
                                                resolve(response);
                                            }
                                        } else {
                                            _this.logError(url, http.status, http.statusText);
                                            reject({
                                                status: http.status,
                                                statusText: http.statusText
                                            });
                                        }
                                    } else {
                                        _this.logError(url, http.status, http.statusText);
                                        reject({
                                            status: http.status,
                                            statusText: http.statusText
                                        });
                                    }
                                }
                            };
                            break;
                        default:
                            http.onreadystatechange = function () {
                                if (http.readyState == 4) {
                                    if (http.status == 200) {
                                        _this.logInfo(url, http.status, http.statusText);
                                        resolve(http.responseText);
                                    } else {
                                        _this.logError(url, http.status, http.statusText);
                                        reject({
                                            status: http.status,
                                            statusText: http.statusText
                                        });
                                    }
                                }
                            };
                    }
                    if (isObject$2(data)) {
                        data = JSON.stringify(data);
                    }
                    http.send(data || null);
                    _this.log.info("xhr (" + _this.method + ":" + url + ")" + "sent");
                });
            }
        }, {
            key: 'setRequestHeaders',
            value: function setRequestHeaders(http) {
                for (var property in this.headers) {
                    if (this.headers.hasOwnProperty(property)) {
                        http.setRequestHeader(property, this.headers[property]);
                    }
                }
            }
        }, {
            key: 'logInfo',
            value: function logInfo(url, status, statusText) {
                this.log.info("xhr (" + this.method + ":" + url + ") done with status " + status + " " + statusText);
            }
        }, {
            key: 'logError',
            value: function logError(url, status, statusText) {
                this.log.error("xhr (" + this.method + ":" + url + ") failed with status " + status + " " + statusText);
            }
        }]);

        return Method;
    }();

    var HTTP = function () {
        function HTTP() {
            _classCallCheck$6(this, HTTP);
        }

        _createClass$5(HTTP, null, [{
            key: 'setLogLevel',
            value: function setLogLevel(name) {
                return this.log.setLevel(name);
            }
        }, {
            key: 'getLogLevel',
            value: function getLogLevel() {
                return this.log.getLevel();
            }
        }, {
            key: 'getMockupData',
            value: function getMockupData() {
                var _this2 = this;

                return new Promise(function (resolve, reject) {
                    _this2.mockupData ? resolve(_this2.mockupData) : reject(null);
                });
            }
        }, {
            key: 'setMockupData',
            value: function setMockupData(mockupData) {
                this.mockupData = mockupData;
            }
        }, {
            key: 'GET',
            value: function GET(url, responseType) {
                return this.mockupData ? this.getMockupData() : this.get.call(url, responseType);
            }
        }, {
            key: 'HEAD',
            value: function HEAD(url, responseType) {
                return this.mockupData ? this.getMockupData() : this.head.call(url, responseType);
            }
        }, {
            key: 'POST',
            value: function POST(url, responseType, data) {
                return this.mockupData ? this.getMockupData() : this.post.call(url, responseType, data);
            }
        }, {
            key: 'PUT',
            value: function PUT(url, responseType, data) {
                return this.mockupData ? this.getMockupData() : this.put.call(url, responseType, data);
            }
        }, {
            key: 'DELETE',
            value: function DELETE(url, responseType) {
                return this.mockupData ? this.getMockupData() : this.delete.call(url, responseType);
            }
        }, {
            key: 'CONNECT',
            value: function CONNECT(url, responseType) {
                return this.mockupData ? this.getMockupData() : this.connect.call(url, responseType);
            }
        }, {
            key: 'OPTIONS',
            value: function OPTIONS(url, responseType) {
                return this.mockupData ? this.getMockupData() : this.options.call(url, responseType);
            }
        }, {
            key: 'TRACE',
            value: function TRACE(url, responseType) {
                return this.mockupData ? this.getMockupData() : this.trace.call(url, responseType);
            }
        }, {
            key: 'PATCH',
            value: function PATCH(url, responseType, data) {
                return this.mockupData ? this.getMockupData() : this.patch.call(url, responseType, data);
            }
        }]);

        return HTTP;
    }();

    HTTP.log = Logger.addGroup("Aias");
    HTTP.mockupData = null;
    HTTP.get = new Method("GET", {
        "Content-Type": "application/x-www-form-urlencoded"
    });
    HTTP.head = new Method("HEAD", {
        "Content-Type": "application/x-www-form-urlencoded"
    });
    HTTP.post = new Method("POST", {
        "Content-Type": "application/json"
    });
    HTTP.put = new Method("PUT", {
        "Content-Type": "application/json"
    });
    HTTP.delete = new Method("DELETE", {
        "Content-Type": "application/x-www-form-urlencoded"
    });
    HTTP.connect = new Method("CONNECT", {
        "Content-Type": "application/x-www-form-urlencoded"
    });
    HTTP.options = new Method("OPTIONS", {
        "Content-Type": "application/x-www-form-urlencoded"
    });
    HTTP.trace = new Method("TRACE", {
        "Content-Type": "application/x-www-form-urlencoded"
    });
    HTTP.patch = new Method("PATCH", {
        "Content-Type": "application/json"
    });

    function loadSound(path) {
        return HTTP.GET(path, "audiobuffer");
    }

    function loadFile(path) {
        return HTTP.GET(path, "text");
    }

    var Request = function () {
        function Request() {
            this.fsm = new FSM([{ name: "send", from: "idle", to: "pending" }, { name: "success", from: "pending", to: "success" }, { name: "error", from: "pending", to: "error" }]);
            this.ajax = {
                file: loadFile,
                img: loadImage,
                sound: loadSound
            };
        }
        Request.prototype.send = function (path, type) {
            var _this = this;
            if (this.fsm["send"]()) {
                return this.ajax[type](path).then(function (response) {
                    _this.fsm["success"]();
                    return response;
                }).catch(function () {
                    _this.fsm["error"]();
                    return null;
                });
            } else {
                return new Promise(function () {
                    return null;
                });
            }
        };
        return Request;
    }();

    var XHR = function () {
        function XHR(path, extension, type) {
            this.path = path;
            this.extension = extension;
            this.type = type;
            this.request = new Request();
            this.response = null;
        }
        XHR.prototype.sendRequest = function (fileName) {
            var _this = this;
            if (this.response) {
                return new Promise(function (resolve) {
                    resolve(fileName);
                });
            } else {
                return this.request.send(this.path + fileName, this.type).then(function (response) {
                    if (response) {
                        _this.response = response;
                    }
                    return fileName;
                });
            }
        };
        XHR.prototype.getRequestStatus = function () {
            return this.request ? this.request.fsm.state : "done";
        };
        XHR.prototype.isRequestSent = function () {
            if (this.getRequestStatus() != "idle") {
                delete this.request;
                return true;
            }
            return false;
        };
        return XHR;
    }();

    var Extension = function () {
        function Extension() {}
        Extension.get = function (path) {
            return path.split(".").pop();
        };
        Extension.getAssetType = function (extension) {
            for (var property in this.validExtensions) {
                if (this.validExtensions.hasOwnProperty(property)) {
                    if (this.check(extension, this.validExtensions[property])) {
                        return property;
                    }
                }
            }
            return false;
        };
        Extension.check = function (extension, validExtensions) {
            return validExtensions.some(function (validExtension) {
                return extension === validExtension;
            });
        };
        Extension.validExtensions = {
            file: ["txt", "text", "json", "glsl", "babylon"],
            img: ["png", "jpg", "jpeg", "gif"],
            sound: ["mp3", "ogg", "wav"]
        };
        return Extension;
    }();

    var Asset = function () {
        function Asset(name, path, params) {
            this.xhr = null;
            this.isValid = false;
            this.name = name;
            this.params = params || null;
            var extension = Extension.get(name);
            if (extension) {
                var type = Extension.getAssetType(extension);
                if (type) {
                    this.xhr = new XHR(path, extension, type);
                    this.isValid = true;
                }
            }
        }
        Asset.prototype.getContent = function () {
            if (this.xhr) {
                return this.xhr.response;
            }
            return false;
        };
        return Asset;
    }();

    var Loader = function () {
        function Loader(assets, assetsPath, progressBarId, progressTextId) {
            this.default = {
                maxPending: 6,
                tick: 100
            };
            this.assets = assets;
            this.path = this.removeTrailingSlash(assetsPath);
            this.pendingRequests = 0;
            this.tick = this.default.tick;
            this.maxPendingRequests = this.default.maxPending;
            this.progress = new Progress(progressBarId, progressTextId);
            this.log = Logger.addGroup("Orbis");
            this.createAssets();
        }
        Loader.prototype.setLogLevel = function (name) {
            return this.log.setLevel(name);
        };
        Loader.prototype.getLogLevel = function () {
            return this.log.getLevel();
        };
        Loader.prototype.getAsset = function (name) {
            for (var property in this.assets) {
                if (this.assets.hasOwnProperty(property)) {
                    for (var _i = 0, _a = this.assets[property].files; _i < _a.length; _i++) {
                        var file = _a[_i];
                        if (file.name === name) {
                            return file;
                        }
                    }
                }
            }
            return false;
        };
        Loader.prototype.getContent = function (name) {
            var asset = this.getAsset(name);
            if (asset) {
                return asset.getContent();
            }
            return false;
        };
        Loader.prototype.getList = function (type) {
            if (this.assets.hasOwnProperty(type)) {
                return this.assets[type].files;
            }
            return false;
        };
        Loader.prototype.start = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.progress.nbAssets) {
                    _this.progress.start();
                    var intervalID_1 = setInterval(function () {
                        _this.sendRequest();
                        if (!_this.progress.running) {
                            clearInterval(intervalID_1);
                            resolve({
                                success: true,
                                message: _this.progress.total + " assets loaded"
                            });
                        }
                    }, _this.tick);
                } else {
                    reject({ success: false, message: "!! nothing to load here" });
                }
            });
        };
        Loader.prototype.resetProgress = function () {
            this.progress.reset();
        };
        Loader.prototype.createAssets = function () {
            this.progress.nbAssets = 0;
            for (var property in this.assets) {
                if (this.assets.hasOwnProperty(property)) {
                    var type = this.assets[property];
                    var folder = type.folder ? type.folder + "/" : "";
                    for (var i = 0; i < type.files.length; i++) {
                        var file = type.files[i];
                        if (!file.xhr && file.hasOwnProperty("name")) {
                            type.files[i] = new Asset(file.name, this.path + "/" + folder, file.params);
                            if (type.files[i].isValid) {
                                this.progress.nbAssets++;
                            }
                        }
                    }
                }
            }
        };
        Loader.prototype.sendRequest = function () {
            var _this = this;
            if (this.pendingRequests < this.maxPendingRequests) {
                var nextAsset = this.getNextAssetToLoad();
                if (nextAsset) {
                    nextAsset.xhr.sendRequest(nextAsset.name).then(function (response) {
                        _this.pendingRequests--;
                        _this.progress.update(response);
                    });
                    return true;
                }
            }
            return false;
        };
        Loader.prototype.getNextAssetToLoad = function () {
            for (var property in this.assets) {
                if (this.assets.hasOwnProperty(property)) {
                    var type = this.assets[property];
                    for (var _i = 0, _a = type.files; _i < _a.length; _i++) {
                        var file = _a[_i];
                        if (file.xhr && !file.xhr.isRequestSent()) {
                            return file;
                        }
                    }
                }
            }
            return false;
        };
        Loader.prototype.removeTrailingSlash = function (path) {
            return path.replace(/\/+$/, "");
        };
        return Loader;
    }();

    exports.Loader = Loader;

    return exports;

}({}));
