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
          key: 'getSign',
          value: function getSign(x) {
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
          value: function lerp(min, max, amount) {
              return (max - min) * amount + min;
          }
      }, {
          key: 'map',
          value: function map(x, sourceMin, sourceMax, destMin, destMax) {
              return this.lerp(destMin, destMax, this.normalize(x, sourceMin, sourceMax));
          }
      }, {
          key: 'isIn',
          value: function isIn(x, min, max) {
              return x >= min && x <= max;
          }
      }, {
          key: 'isOut',
          value: function isOut(x, min, max) {
              return x < min || x > max;
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
              if (value >= 0 && value <= this.maxDecimals) {
                  this.sineDecimals = value;
                  return value;
              }
              return this.sineDecimals = this.maxDecimals;
          }
      }, {
          key: 'setCosinePrecision',
          value: function setCosinePrecision(value) {
              if (value >= 0 && value <= this.maxDecimals) {
                  this.cosineDecimals = value;
                  return value;
              }
              return this.cosineDecimals = this.maxDecimals;
          }
      }, {
          key: 'setArctanPrecision',
          value: function setArctanPrecision(value) {
              if (value >= 0 && value <= this.maxDecimals) {
                  this.arctanDecimals = value;
                  return value;
              }
              return this.arctanDecimals = this.maxDecimals;
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
  Trigonometry.maxDecimals = 8;
  Trigonometry.factorialArray = [];
  Trigonometry.init();

  var Time = function () {
      function Time() {
          _classCallCheck$2(this, Time);
      }

      _createClass$2(Time, null, [{
          key: 'millisecToSec',
          value: function millisecToSec(millisecond) {
              return millisecond * 0.001;
          }
      }, {
          key: 'secToMillisec',
          value: function secToMillisec(second) {
              return second * 1000;
          }
      }, {
          key: 'millisecToFps',
          value: function millisecToFps(millisecond) {
              return 1000 / millisecond;
          }
      }, {
          key: 'fpsToMillisec',
          value: function fpsToMillisec(refreshRate) {
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
              return this.x === 0 && this.y === 0 ? true : false;
          }
      }, {
          key: 'isPositive',
          value: function isPositive() {
              return this.x >= 0 && this.y >= 0 ? true : false;
          }
      }, {
          key: 'setFromArray',
          value: function setFromArray(array, offset) {
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
              return '(x = ' + this.x + '; y = ' + this.y + ')';
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
          value: function copy(v) {
              this.x = v.x;
              this.y = v.y;
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
          key: 'setFromAngle',
          value: function setFromAngle(angle) {
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
              var square = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

              return square ? this.getSquaredMagnitude() : Math.sqrt(this.getSquaredMagnitude());
          }
      }, {
          key: 'getSquaredMagnitude',
          value: function getSquaredMagnitude() {
              return this.x * this.x + this.y * this.y;
          }
      }, {
          key: 'getDistance',
          value: function getDistance(v) {
              var square = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

              this.subtract(v);
              var magnitude = this.getMagnitude(square);
              this.add(v);
              return magnitude;
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
          value: function add(v) {
              this.x += v.x;
              this.y += v.y;
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
          value: function addScaledVector(v, scalar) {
              this.x += v.x * scalar;
              this.y += v.y * scalar;
              return this;
          }
      }, {
          key: 'subtract',
          value: function subtract(v) {
              this.x -= v.x;
              this.y -= v.y;
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
          value: function subtractScaledVector(v, scalar) {
              this.x -= v.x * scalar;
              this.y -= v.y * scalar;
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
          key: 'multiply',
          value: function multiply(v) {
              this.x *= v.x;
              this.y *= v.y;
              return this;
          }
      }, {
          key: 'multiplyScaledVector',
          value: function multiplyScaledVector(v, scalar) {
              this.x *= v.x * scalar;
              this.y *= v.y * scalar;
              return this;
          }
      }, {
          key: 'divide',
          value: function divide(v) {
              this.x /= v.x;
              this.y /= v.y;
              return this;
          }
      }, {
          key: 'divideScaledVector',
          value: function divideScaledVector(v, scalar) {
              this.x /= v.x * scalar;
              this.y /= v.y * scalar;
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
          value: function max(v) {
              this.x = Math.max(this.x, v.x);
              this.y = Math.max(this.y, v.y);
              return this;
          }
      }, {
          key: 'min',
          value: function min(v) {
              this.x = Math.min(this.x, v.x);
              this.y = Math.min(this.y, v.y);
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
          key: 'getMaxAxis',
          value: function getMaxAxis() {
              return this.y > this.x ? 'y' : 'x';
          }
      }, {
          key: 'getMinAxis',
          value: function getMinAxis() {
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
          key: 'absolute',
          value: function absolute() {
              this.x = Math.abs(this.x);
              this.y = Math.abs(this.y);
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
          key: 'clamp',
          value: function clamp(rectangle) {
              this.x = Utils.clamp(this.x, rectangle.topLeftCorner.x, rectangle.bottomRightCorner.x);
              this.y = Utils.clamp(this.y, rectangle.topLeftCorner.y, rectangle.bottomRightCorner.y);
              return this;
          }
      }, {
          key: 'lerp',
          value: function lerp(min, max, amount) {
              this.x = Utils.lerp(min.x, max.x, amount);
              this.y = Utils.lerp(min.y, max.y, amount);
              return this;
          }
      }, {
          key: 'dotProduct',
          value: function dotProduct(v) {
              return this.x * v.x + this.y * v.y;
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
              return this;
          }
      }, {
          key: 'set',
          value: function set(positionX, positionY, radius) {
              this.position.set(positionX, positionY);
              this.radius = radius;
              return this;
          }
      }, {
          key: 'setPositionXY',
          value: function setPositionXY(positionX, positionY) {
              this.position.set(positionX, positionY);
              return this;
          }
      }, {
          key: 'setPositionFromVector',
          value: function setPositionFromVector(position) {
              this.position.copy(position);
              return this;
          }
      }, {
          key: 'scale',
          value: function scale(scalar) {
              this.radius *= scalar;
              return this;
          }
      }, {
          key: 'isIn',
          value: function isIn(v) {
              return v.getDistance(this.position, true) <= this.radius * this.radius;
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
              return this;
          }
      }, {
          key: 'set',
          value: function set(positionX, positionY, sizeX, sizeY) {
              this.setSizeXY(sizeX, sizeY);
              this.setPositionXY(positionX, positionY);
              return this;
          }
      }, {
          key: 'setPositionX',
          value: function setPositionX(x) {
              this.setPosition('x', x);
              return this;
          }
      }, {
          key: 'setPositionY',
          value: function setPositionY(y) {
              this.setPosition('y', y);
              return this;
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
              return this;
          }
      }, {
          key: 'setPositionFromVector',
          value: function setPositionFromVector(position) {
              this.position.copy(position);
              this.setCorners();
              return this;
          }
      }, {
          key: 'setSizeX',
          value: function setSizeX(width) {
              this.setSize('x', width);
              return this;
          }
      }, {
          key: 'setSizeY',
          value: function setSizeY(height) {
              this.setSize('y', height);
              return this;
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
              return this;
          }
      }, {
          key: 'setSizeFromVector',
          value: function setSizeFromVector(size) {
              this.size.copy(size);
              this.setHalfSize();
              this.setCorners();
              return this;
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
          key: 'isIn',
          value: function isIn(vector) {
              return Utils.isIn(vector.x, this.topLeftCorner.x, this.bottomRightCorner.x) && Utils.isIn(vector.y, this.topLeftCorner.y, this.bottomRightCorner.y);
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
          key: 'isOrigin',
          value: function isOrigin() {
              return this.x === 0 && this.y === 0 && this.z === 0 ? true : false;
          }
      }, {
          key: 'isPositive',
          value: function isPositive() {
              return this.x >= 0 && this.y >= 0 && this.z >= 0 ? true : false;
          }
      }, {
          key: 'setFromArray',
          value: function setFromArray(array, offset) {
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
              return '(x = ' + this.x + '; y = ' + this.y + '; z = ' + this.z + ')';
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
          value: function copy(v) {
              this.x = v.x;
              this.y = v.y;
              this.z = v.z;
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
              var square = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

              return square ? this.getSquaredMagnitude() : Math.sqrt(this.getSquaredMagnitude());
          }
      }, {
          key: 'getSquaredMagnitude',
          value: function getSquaredMagnitude() {
              return this.x * this.x + this.y * this.y + this.z * this.z;
          }
      }, {
          key: 'getDistance',
          value: function getDistance(v) {
              var square = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

              this.subtract(v);
              var magnitude = this.getMagnitude(square);
              this.add(v);
              return magnitude;
          }
      }, {
          key: 'add',
          value: function add(v) {
              this.x += v.x;
              this.y += v.y;
              this.z += v.z;
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
          value: function addScaledVector(v, scalar) {
              this.x += v.x * scalar;
              this.y += v.y * scalar;
              this.z += v.z * scalar;
              return this;
          }
      }, {
          key: 'subtract',
          value: function subtract(v) {
              this.x -= v.x;
              this.y -= v.y;
              this.z -= v.z;
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
          value: function subtractScaledVector(v, scalar) {
              this.x -= v.x * scalar;
              this.y -= v.y * scalar;
              this.z -= v.z * scalar;
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
          value: function multiply(v) {
              this.x *= v.x;
              this.y *= v.y;
              this.z *= v.z;
              return this;
          }
      }, {
          key: 'multiplyScaledVector',
          value: function multiplyScaledVector(v, scalar) {
              this.x *= v.x * scalar;
              this.y *= v.y * scalar;
              this.z *= v.z * scalar;
              return this;
          }
      }, {
          key: 'divide',
          value: function divide(v) {
              this.x /= v.x;
              this.y /= v.y;
              this.z /= v.z;
              return this;
          }
      }, {
          key: 'divideScaledVector',
          value: function divideScaledVector(v, scalar) {
              this.x /= v.x * scalar;
              this.y /= v.y * scalar;
              this.z /= v.z * scalar;
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
          value: function max(v) {
              this.x = Math.max(this.x, v.x);
              this.y = Math.max(this.y, v.y);
              this.z = Math.max(this.z, v.z);
              return this;
          }
      }, {
          key: 'min',
          value: function min(v) {
              this.x = Math.min(this.x, v.x);
              this.y = Math.min(this.y, v.y);
              this.z = Math.min(this.z, v.z);
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
          key: 'absolute',
          value: function absolute() {
              this.x = Math.abs(this.x);
              this.y = Math.abs(this.y);
              this.z = Math.abs(this.z);
              return this;
          }
      }, {
          key: 'opposite',
          value: function opposite() {
              this.x = -this.x;
              this.y = -this.y;
              this.z = -this.z;
              return this;
          }
      }, {
          key: 'dotProduct',
          value: function dotProduct(v) {
              return this.x * v.x + this.y * v.y + this.z * v.z;
          }
      }, {
          key: 'cross',
          value: function cross(v) {
              var x = this.x,
                  y = this.y,
                  z = this.z;
              this.x = y * v.z - z * v.y;
              this.y = z * v.x - x * v.z;
              this.z = x * v.y - y * v.x;
              return this;
          }
      }]);

      return Vector3;
  }();

  var Matrix3x3 = function () {
      function Matrix3x3(x1, x2, x3, y1, y2, y3, t1, t2, t3) {
          _classCallCheck$2(this, Matrix3x3);

          this.m = new Float32Array(9);
          this.make(x1, x2, x3, y1, y2, y3, t1, t2, t3);
      }

      _createClass$2(Matrix3x3, [{
          key: 'make',
          value: function make(x1, x2, x3, y1, y2, y3, t1, t2, t3) {
              this.m[0] = x1 || 0.0;
              this.m[1] = x2 || 0.0;
              this.m[2] = x3 || 0.0;
              this.m[3] = y1 || 0.0;
              this.m[4] = y2 || 0.0;
              this.m[5] = y3 || 0.0;
              this.m[6] = t1 || 0.0;
              this.m[7] = t2 || 0.0;
              this.m[8] = t3 || 0.0;
          }
      }, {
          key: 'copy',
          value: function copy(matrix3x3) {
              var m = matrix3x3.m;
              this.make(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8]);
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
              return '(' + this.m[0] + ',' + this.m[1] + ',' + this.m[2] + ';' + this.m[3] + ',' + this.m[4] + ',' + this.m[5] + ';' + this.m[6] + ',' + this.m[7] + ',' + this.m[8] + ')';
          }
      }, {
          key: 'identity',
          value: function identity() {
              this.make(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
              return this;
          }
      }, {
          key: 'scale',
          value: function scale(vector2) {
              this.make(vector2.x, 0.0, 0.0, 0.0, vector2.y, 0.0, 0.0, 0.0, 1.0);
              return this;
          }
      }, {
          key: 'rotate',
          value: function rotate(angle) {
              var cos = Trigonometry.cosine(angle);
              var sin = Trigonometry.sine(angle);
              this.make(cos, sin, 0.0, -sin, cos, 0.0, 0.0, 0.0, 1.0);
              return this;
          }
      }, {
          key: 'translate',
          value: function translate(vector2) {
              this.make(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, vector2.x, vector2.y, 1.0);
              return this;
          }
      }, {
          key: 'multiply',
          value: function multiply(matrix3x3) {
              var m1 = this.m;
              var m2 = matrix3x3.m;
              this.make(m1[0] * m2[0] + m1[3] * m2[1] + m1[6] * m2[2], m1[1] * m2[0] + m1[4] * m2[1] + m1[7] * m2[2], m1[2] * m2[0] + m1[5] * m2[1] + m1[8] * m2[2], m1[0] * m2[3] + m1[3] * m2[4] + m1[6] * m2[5], m1[1] * m2[3] + m1[4] * m2[4] + m1[7] * m2[5], m1[2] * m2[3] + m1[5] * m2[4] + m1[8] * m2[5], m1[0] * m2[6] + m1[3] * m2[7] + m1[6] * m2[8], m1[1] * m2[6] + m1[4] * m2[7] + m1[7] * m2[8], m1[2] * m2[6] + m1[5] * m2[7] + m1[8] * m2[8]);
              return this;
          }
      }]);

      return Matrix3x3;
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
              this.zAxis.copy(eye).subtract(target).normalize();
              this.xAxis.copy(up).cross(this.zAxis).normalize();
              this.yAxis.copy(this.zAxis).cross(this.xAxis);
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

  function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

  var Utils$1 = function () {
      function Utils() {
          _classCallCheck$3(this, Utils);
      }

      _createClass$3(Utils, null, [{
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

  var Trigonometry$1 = function () {
      function Trigonometry() {
          _classCallCheck$3(this, Trigonometry);
      }

      _createClass$3(Trigonometry, null, [{
          key: 'init',
          value: function init() {
              Trigonometry.createRoundedPis();
              Trigonometry.createFactorialArray();
          }
      }, {
          key: 'createRoundedPis',
          value: function createRoundedPis() {
              var decimals = 2;
              this.pi = Utils$1.round(Math.PI, decimals);
              this.twopi = Utils$1.round(Math.PI * 2, decimals);
              this.halfpi = Utils$1.round(Math.PI * 0.5, decimals);
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
                  sign = Utils$1.opposite(sign);
              }
              return result;
          }
      }]);

      return Trigonometry;
  }();

  Trigonometry$1.sineLoops = [9, 11, 13, 15, 17, 18, 19, 21, 23];
  Trigonometry$1.cosineLoops = [6, 8, 10, 12, 14, 16, 18, 20, 22];
  Trigonometry$1.arctanLoops = [17, 19, 21, 23, 25, 27, 29, 31, 33];
  Trigonometry$1.sineDecimals = 2;
  Trigonometry$1.cosineDecimals = 2;
  Trigonometry$1.arctanDecimals = 2;
  Trigonometry$1.factorialArray = [];
  Trigonometry$1.init();

  var Time$1 = function () {
      function Time() {
          _classCallCheck$3(this, Time);
      }

      _createClass$3(Time, null, [{
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

  var Random$1 = function () {
      function Random() {
          _classCallCheck$3(this, Random);
      }

      _createClass$3(Random, null, [{
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

  var NumArray$1 = function () {
      function NumArray() {
          _classCallCheck$3(this, NumArray);
      }

      _createClass$3(NumArray, null, [{
          key: 'min',
          value: function min(array) {
              return Math.min.apply(Math, _toConsumableArray$1(array));
          }
      }, {
          key: 'max',
          value: function max(array) {
              return Math.max.apply(Math, _toConsumableArray$1(array));
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

  var Bezier$1 = function () {
      function Bezier() {
          _classCallCheck$3(this, Bezier);
      }

      _createClass$3(Bezier, null, [{
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

  var Vector2$1 = function () {
      function Vector2(x, y) {
          _classCallCheck$3(this, Vector2);

          this.x = x || 0.0;
          this.y = y || 0.0;
      }

      _createClass$3(Vector2, [{
          key: 'isOrigin',
          value: function isOrigin() {
              return Utils$1.isOrigin(this.x) && Utils$1.isOrigin(this.y) ? true : false;
          }
      }, {
          key: 'isNotOrigin',
          value: function isNotOrigin() {
              return !Utils$1.isOrigin(this.x) || !Utils$1.isOrigin(this.y) ? true : false;
          }
      }, {
          key: 'isPositive',
          value: function isPositive() {
              return Utils$1.isPositive(this.x) && Utils$1.isPositive(this.y) ? true : false;
          }
      }, {
          key: 'isNegative',
          value: function isNegative() {
              return Utils$1.isNegative(this.x) && Utils$1.isNegative(this.y) ? true : false;
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
                  this.x = Trigonometry$1.cosine(angle) * length;
                  this.y = Trigonometry$1.sine(angle) * length;
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
              this.x = Bezier$1.quadratic(p0.x, p1.x, p2.x, t);
              this.y = Bezier$1.quadratic(p0.y, p1.y, p2.y, t);
              return this;
          }
      }, {
          key: 'cubicBezier',
          value: function cubicBezier(p0, p1, p2, p3, t) {
              this.x = Bezier$1.cubic(p0.x, p1.x, p2.x, p3.x, t);
              this.y = Bezier$1.cubic(p0.y, p1.y, p2.y, p3.y, t);
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
              this.x = Utils$1.clamp(this.x, rectangle.topLeftCorner.x, rectangle.bottomRightCorner.x);
              this.y = Utils$1.clamp(this.y, rectangle.topLeftCorner.y, rectangle.bottomRightCorner.y);
              return this;
          }
      }, {
          key: 'lerp',
          value: function lerp(normal, min, max) {
              this.x = Utils$1.lerp(normal, min.x, max.x);
              this.y = Utils$1.lerp(normal, min.y, max.y);
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

  var Circle$1 = function () {
      function Circle(positionX, positionY, radius) {
          _classCallCheck$3(this, Circle);

          this.shape = 'circle';
          this._radius = 0.0;
          this._diameter = 0.0;
          this.position = new Vector2$1(positionX, positionY);
          this.radius = radius;
      }

      _createClass$3(Circle, [{
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
              context.arc(this.position.x, this.position.y, this.radius, 0, Trigonometry$1.twopi, false);
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

  var Rectangle$1 = function () {
      function Rectangle(positionX, positionY, sizeX, sizeY) {
          _classCallCheck$3(this, Rectangle);

          this.shape = 'aabb';
          this.size = new Vector2$1(sizeX, sizeY);
          this.halfSize = new Vector2$1();
          this.setHalfSize();
          this.position = new Vector2$1(positionX, positionY);
          this.topLeftCorner = new Vector2$1(positionX - this.halfSize.x, positionY - this.halfSize.y);
          this.bottomRightCorner = new Vector2$1(positionX + this.halfSize.x, positionY + this.halfSize.y);
      }

      _createClass$3(Rectangle, [{
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
              return Utils$1.contains(vector.x, this.topLeftCorner.x, this.bottomRightCorner.x) && Utils$1.contains(vector.y, this.topLeftCorner.y, this.bottomRightCorner.y);
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

  var Vector3$1 = function () {
      function Vector3(x, y, z) {
          _classCallCheck$3(this, Vector3);

          this.x = x || 0.0;
          this.y = y || 0.0;
          this.z = z || 0.0;
      }

      _createClass$3(Vector3, [{
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

  var Matrix4x3$1 = function () {
      function Matrix4x3(x1, x2, x3, y1, y2, y3, z1, z2, z3, t1, t2, t3) {
          _classCallCheck$3(this, Matrix4x3);

          this.m = new Float32Array(16);
          this.xAxis = new Vector3$1();
          this.yAxis = new Vector3$1();
          this.zAxis = new Vector3$1();
          this.make(x1, x2, x3, y1, y2, y3, z1, z2, z3, t1, t2, t3);
      }

      _createClass$3(Matrix4x3, [{
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
              var cos = Trigonometry$1.cosine(angle);
              var sin = Trigonometry$1.sine(angle);
              this.make(1.0, 0.0, 0.0, 0.0, cos, sin, 0.0, -sin, cos, 0.0, 0.0, 0.0);
              return this;
          }
      }, {
          key: 'rotateY',
          value: function rotateY(angle) {
              var cos = Trigonometry$1.cosine(angle);
              var sin = Trigonometry$1.sine(angle);
              this.make(cos, 0.0, -sin, 0.0, 1.0, 0.0, sin, 0.0, cos, 0.0, 0.0, 0.0);
              return this;
          }
      }, {
          key: 'rotateZ',
          value: function rotateZ(angle) {
              var cos = Trigonometry$1.cosine(angle);
              var sin = Trigonometry$1.sine(angle);
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

  var Matrix4x4$1 = function () {
      function Matrix4x4(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, t1, t2, t3, t4) {
          _classCallCheck$3(this, Matrix4x4);

          this.m = new Float32Array(16);
          this.make(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, t1, t2, t3, t4);
      }

      _createClass$3(Matrix4x4, [{
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
              var cos = Trigonometry$1.cosine(angle);
              var sin = Trigonometry$1.sine(angle);
              this.make(1.0, 0.0, 0.0, 0.0, 0.0, cos, sin, 0.0, 0.0, -sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
              return this;
          }
      }, {
          key: 'rotateY',
          value: function rotateY(angle) {
              var cos = Trigonometry$1.cosine(angle);
              var sin = Trigonometry$1.sine(angle);
              this.make(cos, 0.0, -sin, 0.0, 0.0, 1.0, 0.0, 0.0, sin, 0.0, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
              return this;
          }
      }, {
          key: 'rotateZ',
          value: function rotateZ(angle) {
              var cos = Trigonometry$1.cosine(angle);
              var sin = Trigonometry$1.sine(angle);
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
              var f = Math.tan(Trigonometry$1.halfpi - 0.5 * fovy * Trigonometry$1.pi / 180);
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

  var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
          _classCallCheck$4(this, Message);

          this.id = level.id;
          this.name = level.name;
          this.color = level.color;
          this.content = content;
          this.date = formatDate$1();
      }

      _createClass$4(Message, [{
          key: 'display',
          value: function display(groupName) {
              console[this.name]('%c[' + groupName + '] ' + this.date + ' : ', 'color:' + this.color + ';', this.content);
          }
      }]);

      return Message;
  }();

  var Group$1 = function () {
      function Group(name, level) {
          _classCallCheck$4(this, Group);

          this.messages = [];
          this.name = name;
          this.messages = [];
          this._level = level;
      }

      _createClass$4(Group, [{
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
          _classCallCheck$4(this, Logger);
      }

      _createClass$4(Logger, null, [{
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

  function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

      _classCallCheck$5(this, FSM);

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

  var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
          _classCallCheck$6(this, Clock);

          this.fpsArrayLength = 60;
          this.fpsArray = Array(this.fpsArrayLength);
          this.reset();
      }

      _createClass$5(Clock, [{
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
              this.fpsArray[this.ticks % 60] = Time$1.millisecondToFramePerSecond(this.delta);
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
              return NumArray$1.average(this.fpsArray, this.fpsArrayLength);
          }
      }]);

      return Clock;
  }();

  var Player = function () {
      function Player(callback) {
          _classCallCheck$6(this, Player);

          this.frameId = 0;
          this.minDelta = 0;
          this.clock = new Clock();
          this.callback = callback;
          this.fsm = new FSM([{ name: 'play', from: false, to: true }, { name: 'stop', from: true, to: false }]);
      }

      _createClass$5(Player, [{
          key: 'setMaxRefreshRate',
          value: function setMaxRefreshRate(maxFPS) {
              this.minDelta = isNumber$1(maxFPS) ? Time$1.framePerSecondToMillisecond(maxFPS) : this.minDelta;
          }
      }, {
          key: 'getDelta',
          value: function getDelta() {
              return Time$1.millisecondToSecond(this.clock.delta);
          }
      }, {
          key: 'getTotal',
          value: function getTotal() {
              return Time$1.millisecondToSecond(this.clock.total);
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

  function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

  var FSM$1 = function FSM(events) {
      var _this = this;

      _classCallCheck$7(this, FSM);

      this.state = events[0].from;
      this.log = Logger.addGroup('Taipan');
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

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
      } || function (d, b) {
          for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
          }
      };
      return _extendStatics(d, b);
  };

  function __extends(d, b) {
      _extendStatics(d, b);
      function __() {
          this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isFunction$3(x) {
      return typeof x === 'function';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var _enable_super_gross_mode_that_will_cause_bad_things = false;
  var config = {
      Promise: undefined,
      set useDeprecatedSynchronousErrorHandling(value) {
          if (value) {
              var error = /*@__PURE__*/new Error();
              /*@__PURE__*/console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
          } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
              /*@__PURE__*/console.log('RxJS: Back to a better error behavior. Thank you. <3');
          }
          _enable_super_gross_mode_that_will_cause_bad_things = value;
      },
      get useDeprecatedSynchronousErrorHandling() {
          return _enable_super_gross_mode_that_will_cause_bad_things;
      }
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function hostReportError(err) {
      setTimeout(function () {
          throw err;
      }, 0);
  }

  /** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
  var empty = {
      closed: true,
      next: function next(value) {},
      error: function error(err) {
          if (config.useDeprecatedSynchronousErrorHandling) {
              throw err;
          } else {
              hostReportError(err);
          }
      },
      complete: function complete() {}
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var isArray$3 = /*@__PURE__*/function () {
    return Array.isArray || function (x) {
      return x && typeof x.length === 'number';
    };
  }();

  var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isObject$3(x) {
      return x !== null && (typeof x === 'undefined' ? 'undefined' : _typeof$4(x)) === 'object';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var UnsubscriptionErrorImpl = /*@__PURE__*/function () {
      function UnsubscriptionErrorImpl(errors) {
          Error.call(this);
          this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
              return i + 1 + ") " + err.toString();
          }).join('\n  ') : '';
          this.name = 'UnsubscriptionError';
          this.errors = errors;
          return this;
      }
      UnsubscriptionErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
      return UnsubscriptionErrorImpl;
  }();
  var UnsubscriptionError = UnsubscriptionErrorImpl;

  var _typeof$5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  /** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */
  var Subscription = /*@__PURE__*/function () {
      function Subscription(unsubscribe) {
          this.closed = false;
          this._parentOrParents = null;
          this._subscriptions = null;
          if (unsubscribe) {
              this._unsubscribe = unsubscribe;
          }
      }
      Subscription.prototype.unsubscribe = function () {
          var errors;
          if (this.closed) {
              return;
          }
          var _a = this,
              _parentOrParents = _a._parentOrParents,
              _unsubscribe = _a._unsubscribe,
              _subscriptions = _a._subscriptions;
          this.closed = true;
          this._parentOrParents = null;
          this._subscriptions = null;
          if (_parentOrParents instanceof Subscription) {
              _parentOrParents.remove(this);
          } else if (_parentOrParents !== null) {
              for (var index = 0; index < _parentOrParents.length; ++index) {
                  var parent_1 = _parentOrParents[index];
                  parent_1.remove(this);
              }
          }
          if (isFunction$3(_unsubscribe)) {
              try {
                  _unsubscribe.call(this);
              } catch (e) {
                  errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
              }
          }
          if (isArray$3(_subscriptions)) {
              var index = -1;
              var len = _subscriptions.length;
              while (++index < len) {
                  var sub = _subscriptions[index];
                  if (isObject$3(sub)) {
                      try {
                          sub.unsubscribe();
                      } catch (e) {
                          errors = errors || [];
                          if (e instanceof UnsubscriptionError) {
                              errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                          } else {
                              errors.push(e);
                          }
                      }
                  }
              }
          }
          if (errors) {
              throw new UnsubscriptionError(errors);
          }
      };
      Subscription.prototype.add = function (teardown) {
          var subscription = teardown;
          if (!teardown) {
              return Subscription.EMPTY;
          }
          switch (typeof teardown === 'undefined' ? 'undefined' : _typeof$5(teardown)) {
              case 'function':
                  subscription = new Subscription(teardown);
              case 'object':
                  if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                      return subscription;
                  } else if (this.closed) {
                      subscription.unsubscribe();
                      return subscription;
                  } else if (!(subscription instanceof Subscription)) {
                      var tmp = subscription;
                      subscription = new Subscription();
                      subscription._subscriptions = [tmp];
                  }
                  break;
              default:
                  {
                      throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
                  }
          }
          var _parentOrParents = subscription._parentOrParents;
          if (_parentOrParents === null) {
              subscription._parentOrParents = this;
          } else if (_parentOrParents instanceof Subscription) {
              if (_parentOrParents === this) {
                  return subscription;
              }
              subscription._parentOrParents = [_parentOrParents, this];
          } else if (_parentOrParents.indexOf(this) === -1) {
              _parentOrParents.push(this);
          } else {
              return subscription;
          }
          var subscriptions = this._subscriptions;
          if (subscriptions === null) {
              this._subscriptions = [subscription];
          } else {
              subscriptions.push(subscription);
          }
          return subscription;
      };
      Subscription.prototype.remove = function (subscription) {
          var subscriptions = this._subscriptions;
          if (subscriptions) {
              var subscriptionIndex = subscriptions.indexOf(subscription);
              if (subscriptionIndex !== -1) {
                  subscriptions.splice(subscriptionIndex, 1);
              }
          }
      };
      Subscription.EMPTY = function (empty) {
          empty.closed = true;
          return empty;
      }(new Subscription());
      return Subscription;
  }();
  function flattenUnsubscriptionErrors(errors) {
      return errors.reduce(function (errs, err) {
          return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
      }, []);
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var rxSubscriber = /*@__PURE__*/function () {
      return typeof Symbol === 'function' ? /*@__PURE__*/Symbol('rxSubscriber') : '@@rxSubscriber_' + /*@__PURE__*/Math.random();
  }();

  var _typeof$6 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  /** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */
  var Subscriber = /*@__PURE__*/function (_super) {
      __extends(Subscriber, _super);
      function Subscriber(destinationOrNext, error, complete) {
          var _this = _super.call(this) || this;
          _this.syncErrorValue = null;
          _this.syncErrorThrown = false;
          _this.syncErrorThrowable = false;
          _this.isStopped = false;
          switch (arguments.length) {
              case 0:
                  _this.destination = empty;
                  break;
              case 1:
                  if (!destinationOrNext) {
                      _this.destination = empty;
                      break;
                  }
                  if ((typeof destinationOrNext === 'undefined' ? 'undefined' : _typeof$6(destinationOrNext)) === 'object') {
                      if (destinationOrNext instanceof Subscriber) {
                          _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                          _this.destination = destinationOrNext;
                          destinationOrNext.add(_this);
                      } else {
                          _this.syncErrorThrowable = true;
                          _this.destination = new SafeSubscriber(_this, destinationOrNext);
                      }
                      break;
                  }
              default:
                  _this.syncErrorThrowable = true;
                  _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                  break;
          }
          return _this;
      }
      Subscriber.prototype[rxSubscriber] = function () {
          return this;
      };
      Subscriber.create = function (next, error, complete) {
          var subscriber = new Subscriber(next, error, complete);
          subscriber.syncErrorThrowable = false;
          return subscriber;
      };
      Subscriber.prototype.next = function (value) {
          if (!this.isStopped) {
              this._next(value);
          }
      };
      Subscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              this.isStopped = true;
              this._error(err);
          }
      };
      Subscriber.prototype.complete = function () {
          if (!this.isStopped) {
              this.isStopped = true;
              this._complete();
          }
      };
      Subscriber.prototype.unsubscribe = function () {
          if (this.closed) {
              return;
          }
          this.isStopped = true;
          _super.prototype.unsubscribe.call(this);
      };
      Subscriber.prototype._next = function (value) {
          this.destination.next(value);
      };
      Subscriber.prototype._error = function (err) {
          this.destination.error(err);
          this.unsubscribe();
      };
      Subscriber.prototype._complete = function () {
          this.destination.complete();
          this.unsubscribe();
      };
      Subscriber.prototype._unsubscribeAndRecycle = function () {
          var _parentOrParents = this._parentOrParents;
          this._parentOrParents = null;
          this.unsubscribe();
          this.closed = false;
          this.isStopped = false;
          this._parentOrParents = _parentOrParents;
          return this;
      };
      return Subscriber;
  }(Subscription);
  var SafeSubscriber = /*@__PURE__*/function (_super) {
      __extends(SafeSubscriber, _super);
      function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
          var _this = _super.call(this) || this;
          _this._parentSubscriber = _parentSubscriber;
          var next;
          var context = _this;
          if (isFunction$3(observerOrNext)) {
              next = observerOrNext;
          } else if (observerOrNext) {
              next = observerOrNext.next;
              error = observerOrNext.error;
              complete = observerOrNext.complete;
              if (observerOrNext !== empty) {
                  context = Object.create(observerOrNext);
                  if (isFunction$3(context.unsubscribe)) {
                      _this.add(context.unsubscribe.bind(context));
                  }
                  context.unsubscribe = _this.unsubscribe.bind(_this);
              }
          }
          _this._context = context;
          _this._next = next;
          _this._error = error;
          _this._complete = complete;
          return _this;
      }
      SafeSubscriber.prototype.next = function (value) {
          if (!this.isStopped && this._next) {
              var _parentSubscriber = this._parentSubscriber;
              if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                  this.__tryOrUnsub(this._next, value);
              } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                  this.unsubscribe();
              }
          }
      };
      SafeSubscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              var _parentSubscriber = this._parentSubscriber;
              var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
              if (this._error) {
                  if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                      this.__tryOrUnsub(this._error, err);
                      this.unsubscribe();
                  } else {
                      this.__tryOrSetError(_parentSubscriber, this._error, err);
                      this.unsubscribe();
                  }
              } else if (!_parentSubscriber.syncErrorThrowable) {
                  this.unsubscribe();
                  if (useDeprecatedSynchronousErrorHandling) {
                      throw err;
                  }
                  hostReportError(err);
              } else {
                  if (useDeprecatedSynchronousErrorHandling) {
                      _parentSubscriber.syncErrorValue = err;
                      _parentSubscriber.syncErrorThrown = true;
                  } else {
                      hostReportError(err);
                  }
                  this.unsubscribe();
              }
          }
      };
      SafeSubscriber.prototype.complete = function () {
          var _this = this;
          if (!this.isStopped) {
              var _parentSubscriber = this._parentSubscriber;
              if (this._complete) {
                  var wrappedComplete = function wrappedComplete() {
                      return _this._complete.call(_this._context);
                  };
                  if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                      this.__tryOrUnsub(wrappedComplete);
                      this.unsubscribe();
                  } else {
                      this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                      this.unsubscribe();
                  }
              } else {
                  this.unsubscribe();
              }
          }
      };
      SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
          try {
              fn.call(this._context, value);
          } catch (err) {
              this.unsubscribe();
              if (config.useDeprecatedSynchronousErrorHandling) {
                  throw err;
              } else {
                  hostReportError(err);
              }
          }
      };
      SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
          if (!config.useDeprecatedSynchronousErrorHandling) {
              throw new Error('bad call');
          }
          try {
              fn.call(this._context, value);
          } catch (err) {
              if (config.useDeprecatedSynchronousErrorHandling) {
                  parent.syncErrorValue = err;
                  parent.syncErrorThrown = true;
                  return true;
              } else {
                  hostReportError(err);
                  return true;
              }
          }
          return false;
      };
      SafeSubscriber.prototype._unsubscribe = function () {
          var _parentSubscriber = this._parentSubscriber;
          this._context = null;
          this._parentSubscriber = null;
          _parentSubscriber.unsubscribe();
      };
      return SafeSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
  function canReportError(observer) {
      while (observer) {
          var _a = observer,
              closed_1 = _a.closed,
              destination = _a.destination,
              isStopped = _a.isStopped;
          if (closed_1 || isStopped) {
              return false;
          } else if (destination && destination instanceof Subscriber) {
              observer = destination;
          } else {
              observer = null;
          }
      }
      return true;
  }

  /** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
  function toSubscriber(nextOrObserver, error, complete) {
      if (nextOrObserver) {
          if (nextOrObserver instanceof Subscriber) {
              return nextOrObserver;
          }
          if (nextOrObserver[rxSubscriber]) {
              return nextOrObserver[rxSubscriber]();
          }
      }
      if (!nextOrObserver && !error && !complete) {
          return new Subscriber(empty);
      }
      return new Subscriber(nextOrObserver, error, complete);
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var observable = /*@__PURE__*/function () {
    return typeof Symbol === 'function' && Symbol.observable || '@@observable';
  }();

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function noop() {}

  /** PURE_IMPORTS_START _noop PURE_IMPORTS_END */

  function pipeFromArray(fns) {
      if (!fns) {
          return noop;
      }
      if (fns.length === 1) {
          return fns[0];
      }
      return function piped(input) {
          return fns.reduce(function (prev, fn) {
              return fn(prev);
          }, input);
      };
  }

  /** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */
  var Observable = /*@__PURE__*/function () {
      function Observable(subscribe) {
          this._isScalar = false;
          if (subscribe) {
              this._subscribe = subscribe;
          }
      }
      Observable.prototype.lift = function (operator) {
          var observable$$1 = new Observable();
          observable$$1.source = this;
          observable$$1.operator = operator;
          return observable$$1;
      };
      Observable.prototype.subscribe = function (observerOrNext, error, complete) {
          var operator = this.operator;
          var sink = toSubscriber(observerOrNext, error, complete);
          if (operator) {
              sink.add(operator.call(sink, this.source));
          } else {
              sink.add(this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
          }
          if (config.useDeprecatedSynchronousErrorHandling) {
              if (sink.syncErrorThrowable) {
                  sink.syncErrorThrowable = false;
                  if (sink.syncErrorThrown) {
                      throw sink.syncErrorValue;
                  }
              }
          }
          return sink;
      };
      Observable.prototype._trySubscribe = function (sink) {
          try {
              return this._subscribe(sink);
          } catch (err) {
              if (config.useDeprecatedSynchronousErrorHandling) {
                  sink.syncErrorThrown = true;
                  sink.syncErrorValue = err;
              }
              if (canReportError(sink)) {
                  sink.error(err);
              } else {
                  console.warn(err);
              }
          }
      };
      Observable.prototype.forEach = function (next, promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function (resolve, reject) {
              var subscription;
              subscription = _this.subscribe(function (value) {
                  try {
                      next(value);
                  } catch (err) {
                      reject(err);
                      if (subscription) {
                          subscription.unsubscribe();
                      }
                  }
              }, reject, resolve);
          });
      };
      Observable.prototype._subscribe = function (subscriber) {
          var source = this.source;
          return source && source.subscribe(subscriber);
      };
      Observable.prototype[observable] = function () {
          return this;
      };
      Observable.prototype.pipe = function () {
          var operations = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              operations[_i] = arguments[_i];
          }
          if (operations.length === 0) {
              return this;
          }
          return pipeFromArray(operations)(this);
      };
      Observable.prototype.toPromise = function (promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function (resolve, reject) {
              var value;
              _this.subscribe(function (x) {
                  return value = x;
              }, function (err) {
                  return reject(err);
              }, function () {
                  return resolve(value);
              });
          });
      };
      Observable.create = function (subscribe) {
          return new Observable(subscribe);
      };
      return Observable;
  }();
  function getPromiseCtor(promiseCtor) {
      if (!promiseCtor) {
          promiseCtor = config.Promise || Promise;
      }
      if (!promiseCtor) {
          throw new Error('no Promise impl found');
      }
      return promiseCtor;
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var ObjectUnsubscribedErrorImpl = /*@__PURE__*/function () {
      function ObjectUnsubscribedErrorImpl() {
          Error.call(this);
          this.message = 'object unsubscribed';
          this.name = 'ObjectUnsubscribedError';
          return this;
      }
      ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
      return ObjectUnsubscribedErrorImpl;
  }();
  var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

  /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
  var SubjectSubscription = /*@__PURE__*/function (_super) {
      __extends(SubjectSubscription, _super);
      function SubjectSubscription(subject, subscriber) {
          var _this = _super.call(this) || this;
          _this.subject = subject;
          _this.subscriber = subscriber;
          _this.closed = false;
          return _this;
      }
      SubjectSubscription.prototype.unsubscribe = function () {
          if (this.closed) {
              return;
          }
          this.closed = true;
          var subject = this.subject;
          var observers = subject.observers;
          this.subject = null;
          if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
              return;
          }
          var subscriberIndex = observers.indexOf(this.subscriber);
          if (subscriberIndex !== -1) {
              observers.splice(subscriberIndex, 1);
          }
      };
      return SubjectSubscription;
  }(Subscription);

  /** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */
  var SubjectSubscriber = /*@__PURE__*/function (_super) {
      __extends(SubjectSubscriber, _super);
      function SubjectSubscriber(destination) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          return _this;
      }
      return SubjectSubscriber;
  }(Subscriber);
  var Subject = /*@__PURE__*/function (_super) {
      __extends(Subject, _super);
      function Subject() {
          var _this = _super.call(this) || this;
          _this.observers = [];
          _this.closed = false;
          _this.isStopped = false;
          _this.hasError = false;
          _this.thrownError = null;
          return _this;
      }
      Subject.prototype[rxSubscriber] = function () {
          return new SubjectSubscriber(this);
      };
      Subject.prototype.lift = function (operator) {
          var subject = new AnonymousSubject(this, this);
          subject.operator = operator;
          return subject;
      };
      Subject.prototype.next = function (value) {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          }
          if (!this.isStopped) {
              var observers = this.observers;
              var len = observers.length;
              var copy = observers.slice();
              for (var i = 0; i < len; i++) {
                  copy[i].next(value);
              }
          }
      };
      Subject.prototype.error = function (err) {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          }
          this.hasError = true;
          this.thrownError = err;
          this.isStopped = true;
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
              copy[i].error(err);
          }
          this.observers.length = 0;
      };
      Subject.prototype.complete = function () {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          }
          this.isStopped = true;
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
              copy[i].complete();
          }
          this.observers.length = 0;
      };
      Subject.prototype.unsubscribe = function () {
          this.isStopped = true;
          this.closed = true;
          this.observers = null;
      };
      Subject.prototype._trySubscribe = function (subscriber) {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          } else {
              return _super.prototype._trySubscribe.call(this, subscriber);
          }
      };
      Subject.prototype._subscribe = function (subscriber) {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          } else if (this.hasError) {
              subscriber.error(this.thrownError);
              return Subscription.EMPTY;
          } else if (this.isStopped) {
              subscriber.complete();
              return Subscription.EMPTY;
          } else {
              this.observers.push(subscriber);
              return new SubjectSubscription(this, subscriber);
          }
      };
      Subject.prototype.asObservable = function () {
          var observable = new Observable();
          observable.source = this;
          return observable;
      };
      Subject.create = function (destination, source) {
          return new AnonymousSubject(destination, source);
      };
      return Subject;
  }(Observable);
  var AnonymousSubject = /*@__PURE__*/function (_super) {
      __extends(AnonymousSubject, _super);
      function AnonymousSubject(destination, source) {
          var _this = _super.call(this) || this;
          _this.destination = destination;
          _this.source = source;
          return _this;
      }
      AnonymousSubject.prototype.next = function (value) {
          var destination = this.destination;
          if (destination && destination.next) {
              destination.next(value);
          }
      };
      AnonymousSubject.prototype.error = function (err) {
          var destination = this.destination;
          if (destination && destination.error) {
              this.destination.error(err);
          }
      };
      AnonymousSubject.prototype.complete = function () {
          var destination = this.destination;
          if (destination && destination.complete) {
              this.destination.complete();
          }
      };
      AnonymousSubject.prototype._subscribe = function (subscriber) {
          var source = this.source;
          if (source) {
              return this.source.subscribe(subscriber);
          } else {
              return Subscription.EMPTY;
          }
      };
      return AnonymousSubject;
  }(Subject);

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  function refCount() {
      return function refCountOperatorFunction(source) {
          return source.lift(new RefCountOperator(source));
      };
  }
  var RefCountOperator = /*@__PURE__*/function () {
      function RefCountOperator(connectable) {
          this.connectable = connectable;
      }
      RefCountOperator.prototype.call = function (subscriber, source) {
          var connectable = this.connectable;
          connectable._refCount++;
          var refCounter = new RefCountSubscriber(subscriber, connectable);
          var subscription = source.subscribe(refCounter);
          if (!refCounter.closed) {
              refCounter.connection = connectable.connect();
          }
          return subscription;
      };
      return RefCountOperator;
  }();
  var RefCountSubscriber = /*@__PURE__*/function (_super) {
      __extends(RefCountSubscriber, _super);
      function RefCountSubscriber(destination, connectable) {
          var _this = _super.call(this, destination) || this;
          _this.connectable = connectable;
          return _this;
      }
      RefCountSubscriber.prototype._unsubscribe = function () {
          var connectable = this.connectable;
          if (!connectable) {
              this.connection = null;
              return;
          }
          this.connectable = null;
          var refCount = connectable._refCount;
          if (refCount <= 0) {
              this.connection = null;
              return;
          }
          connectable._refCount = refCount - 1;
          if (refCount > 1) {
              this.connection = null;
              return;
          }
          var connection = this.connection;
          var sharedConnection = connectable._connection;
          this.connection = null;
          if (sharedConnection && (!connection || sharedConnection === connection)) {
              sharedConnection.unsubscribe();
          }
      };
      return RefCountSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */
  var ConnectableObservable = /*@__PURE__*/function (_super) {
      __extends(ConnectableObservable, _super);
      function ConnectableObservable(source, subjectFactory) {
          var _this = _super.call(this) || this;
          _this.source = source;
          _this.subjectFactory = subjectFactory;
          _this._refCount = 0;
          _this._isComplete = false;
          return _this;
      }
      ConnectableObservable.prototype._subscribe = function (subscriber) {
          return this.getSubject().subscribe(subscriber);
      };
      ConnectableObservable.prototype.getSubject = function () {
          var subject = this._subject;
          if (!subject || subject.isStopped) {
              this._subject = this.subjectFactory();
          }
          return this._subject;
      };
      ConnectableObservable.prototype.connect = function () {
          var connection = this._connection;
          if (!connection) {
              this._isComplete = false;
              connection = this._connection = new Subscription();
              connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
              if (connection.closed) {
                  this._connection = null;
                  connection = Subscription.EMPTY;
              }
          }
          return connection;
      };
      ConnectableObservable.prototype.refCount = function () {
          return refCount()(this);
      };
      return ConnectableObservable;
  }(Observable);

  var ConnectableSubscriber = /*@__PURE__*/function (_super) {
      __extends(ConnectableSubscriber, _super);
      function ConnectableSubscriber(destination, connectable) {
          var _this = _super.call(this, destination) || this;
          _this.connectable = connectable;
          return _this;
      }
      ConnectableSubscriber.prototype._error = function (err) {
          this._unsubscribe();
          _super.prototype._error.call(this, err);
      };
      ConnectableSubscriber.prototype._complete = function () {
          this.connectable._isComplete = true;
          this._unsubscribe();
          _super.prototype._complete.call(this);
      };
      ConnectableSubscriber.prototype._unsubscribe = function () {
          var connectable = this.connectable;
          if (connectable) {
              this.connectable = null;
              var connection = connectable._connection;
              connectable._refCount = 0;
              connectable._subject = null;
              connectable._connection = null;
              if (connection) {
                  connection.unsubscribe();
              }
          }
      };
      return ConnectableSubscriber;
  }(SubjectSubscriber);
  var RefCountSubscriber$1 = /*@__PURE__*/function (_super) {
      __extends(RefCountSubscriber, _super);
      function RefCountSubscriber(destination, connectable) {
          var _this = _super.call(this, destination) || this;
          _this.connectable = connectable;
          return _this;
      }
      RefCountSubscriber.prototype._unsubscribe = function () {
          var connectable = this.connectable;
          if (!connectable) {
              this.connection = null;
              return;
          }
          this.connectable = null;
          var refCount$$1 = connectable._refCount;
          if (refCount$$1 <= 0) {
              this.connection = null;
              return;
          }
          connectable._refCount = refCount$$1 - 1;
          if (refCount$$1 > 1) {
              this.connection = null;
              return;
          }
          var connection = this.connection;
          var sharedConnection = connectable._connection;
          this.connection = null;
          if (sharedConnection && (!connection || sharedConnection === connection)) {
              sharedConnection.unsubscribe();
          }
      };
      return RefCountSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */

  var GroupBySubscriber = /*@__PURE__*/function (_super) {
      __extends(GroupBySubscriber, _super);
      function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
          var _this = _super.call(this, destination) || this;
          _this.keySelector = keySelector;
          _this.elementSelector = elementSelector;
          _this.durationSelector = durationSelector;
          _this.subjectSelector = subjectSelector;
          _this.groups = null;
          _this.attemptedToUnsubscribe = false;
          _this.count = 0;
          return _this;
      }
      GroupBySubscriber.prototype._next = function (value) {
          var key;
          try {
              key = this.keySelector(value);
          } catch (err) {
              this.error(err);
              return;
          }
          this._group(value, key);
      };
      GroupBySubscriber.prototype._group = function (value, key) {
          var groups = this.groups;
          if (!groups) {
              groups = this.groups = new Map();
          }
          var group = groups.get(key);
          var element;
          if (this.elementSelector) {
              try {
                  element = this.elementSelector(value);
              } catch (err) {
                  this.error(err);
              }
          } else {
              element = value;
          }
          if (!group) {
              group = this.subjectSelector ? this.subjectSelector() : new Subject();
              groups.set(key, group);
              var groupedObservable = new GroupedObservable(key, group, this);
              this.destination.next(groupedObservable);
              if (this.durationSelector) {
                  var duration = void 0;
                  try {
                      duration = this.durationSelector(new GroupedObservable(key, group));
                  } catch (err) {
                      this.error(err);
                      return;
                  }
                  this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
              }
          }
          if (!group.closed) {
              group.next(element);
          }
      };
      GroupBySubscriber.prototype._error = function (err) {
          var groups = this.groups;
          if (groups) {
              groups.forEach(function (group, key) {
                  group.error(err);
              });
              groups.clear();
          }
          this.destination.error(err);
      };
      GroupBySubscriber.prototype._complete = function () {
          var groups = this.groups;
          if (groups) {
              groups.forEach(function (group, key) {
                  group.complete();
              });
              groups.clear();
          }
          this.destination.complete();
      };
      GroupBySubscriber.prototype.removeGroup = function (key) {
          this.groups.delete(key);
      };
      GroupBySubscriber.prototype.unsubscribe = function () {
          if (!this.closed) {
              this.attemptedToUnsubscribe = true;
              if (this.count === 0) {
                  _super.prototype.unsubscribe.call(this);
              }
          }
      };
      return GroupBySubscriber;
  }(Subscriber);
  var GroupDurationSubscriber = /*@__PURE__*/function (_super) {
      __extends(GroupDurationSubscriber, _super);
      function GroupDurationSubscriber(key, group, parent) {
          var _this = _super.call(this, group) || this;
          _this.key = key;
          _this.group = group;
          _this.parent = parent;
          return _this;
      }
      GroupDurationSubscriber.prototype._next = function (value) {
          this.complete();
      };
      GroupDurationSubscriber.prototype._unsubscribe = function () {
          var _a = this,
              parent = _a.parent,
              key = _a.key;
          this.key = this.parent = null;
          if (parent) {
              parent.removeGroup(key);
          }
      };
      return GroupDurationSubscriber;
  }(Subscriber);
  var GroupedObservable = /*@__PURE__*/function (_super) {
      __extends(GroupedObservable, _super);
      function GroupedObservable(key, groupSubject, refCountSubscription) {
          var _this = _super.call(this) || this;
          _this.key = key;
          _this.groupSubject = groupSubject;
          _this.refCountSubscription = refCountSubscription;
          return _this;
      }
      GroupedObservable.prototype._subscribe = function (subscriber) {
          var subscription = new Subscription();
          var _a = this,
              refCountSubscription = _a.refCountSubscription,
              groupSubject = _a.groupSubject;
          if (refCountSubscription && !refCountSubscription.closed) {
              subscription.add(new InnerRefCountSubscription(refCountSubscription));
          }
          subscription.add(groupSubject.subscribe(subscriber));
          return subscription;
      };
      return GroupedObservable;
  }(Observable);
  var InnerRefCountSubscription = /*@__PURE__*/function (_super) {
      __extends(InnerRefCountSubscription, _super);
      function InnerRefCountSubscription(parent) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          parent.count++;
          return _this;
      }
      InnerRefCountSubscription.prototype.unsubscribe = function () {
          var parent = this.parent;
          if (!parent.closed && !this.closed) {
              _super.prototype.unsubscribe.call(this);
              parent.count -= 1;
              if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                  parent.unsubscribe();
              }
          }
      };
      return InnerRefCountSubscription;
  }(Subscription);

  /** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */
  var BehaviorSubject = /*@__PURE__*/function (_super) {
      __extends(BehaviorSubject, _super);
      function BehaviorSubject(_value) {
          var _this = _super.call(this) || this;
          _this._value = _value;
          return _this;
      }
      Object.defineProperty(BehaviorSubject.prototype, "value", {
          get: function get() {
              return this.getValue();
          },
          enumerable: true,
          configurable: true
      });
      BehaviorSubject.prototype._subscribe = function (subscriber) {
          var subscription = _super.prototype._subscribe.call(this, subscriber);
          if (subscription && !subscription.closed) {
              subscriber.next(this._value);
          }
          return subscription;
      };
      BehaviorSubject.prototype.getValue = function () {
          if (this.hasError) {
              throw this.thrownError;
          } else if (this.closed) {
              throw new ObjectUnsubscribedError();
          } else {
              return this._value;
          }
      };
      BehaviorSubject.prototype.next = function (value) {
          _super.prototype.next.call(this, this._value = value);
      };
      return BehaviorSubject;
  }(Subject);

  /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
  var Action = /*@__PURE__*/function (_super) {
      __extends(Action, _super);
      function Action(scheduler, work) {
          return _super.call(this) || this;
      }
      Action.prototype.schedule = function (state, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          return this;
      };
      return Action;
  }(Subscription);

  /** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */
  var AsyncAction = /*@__PURE__*/function (_super) {
      __extends(AsyncAction, _super);
      function AsyncAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.pending = false;
          return _this;
      }
      AsyncAction.prototype.schedule = function (state, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (this.closed) {
              return this;
          }
          this.state = state;
          var id = this.id;
          var scheduler = this.scheduler;
          if (id != null) {
              this.id = this.recycleAsyncId(scheduler, id, delay);
          }
          this.pending = true;
          this.delay = delay;
          this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
          return this;
      };
      AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          return setInterval(scheduler.flush.bind(scheduler, this), delay);
      };
      AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (delay !== null && this.delay === delay && this.pending === false) {
              return id;
          }
          clearInterval(id);
          return undefined;
      };
      AsyncAction.prototype.execute = function (state, delay) {
          if (this.closed) {
              return new Error('executing a cancelled action');
          }
          this.pending = false;
          var error = this._execute(state, delay);
          if (error) {
              return error;
          } else if (this.pending === false && this.id != null) {
              this.id = this.recycleAsyncId(this.scheduler, this.id, null);
          }
      };
      AsyncAction.prototype._execute = function (state, delay) {
          var errored = false;
          var errorValue = undefined;
          try {
              this.work(state);
          } catch (e) {
              errored = true;
              errorValue = !!e && e || new Error(e);
          }
          if (errored) {
              this.unsubscribe();
              return errorValue;
          }
      };
      AsyncAction.prototype._unsubscribe = function () {
          var id = this.id;
          var scheduler = this.scheduler;
          var actions = scheduler.actions;
          var index = actions.indexOf(this);
          this.work = null;
          this.state = null;
          this.pending = false;
          this.scheduler = null;
          if (index !== -1) {
              actions.splice(index, 1);
          }
          if (id != null) {
              this.id = this.recycleAsyncId(scheduler, id, null);
          }
          this.delay = null;
      };
      return AsyncAction;
  }(Action);

  /** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */
  var QueueAction = /*@__PURE__*/function (_super) {
      __extends(QueueAction, _super);
      function QueueAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
      }
      QueueAction.prototype.schedule = function (state, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (delay > 0) {
              return _super.prototype.schedule.call(this, state, delay);
          }
          this.delay = delay;
          this.state = state;
          this.scheduler.flush(this);
          return this;
      };
      QueueAction.prototype.execute = function (state, delay) {
          return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
      };
      QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
              return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          return scheduler.flush(this);
      };
      return QueueAction;
  }(AsyncAction);

  var Scheduler = /*@__PURE__*/function () {
      function Scheduler(SchedulerAction, now) {
          if (now === void 0) {
              now = Scheduler.now;
          }
          this.SchedulerAction = SchedulerAction;
          this.now = now;
      }
      Scheduler.prototype.schedule = function (work, delay, state) {
          if (delay === void 0) {
              delay = 0;
          }
          return new this.SchedulerAction(this, work).schedule(state, delay);
      };
      Scheduler.now = function () {
          return Date.now();
      };
      return Scheduler;
  }();

  /** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */
  var AsyncScheduler = /*@__PURE__*/function (_super) {
      __extends(AsyncScheduler, _super);
      function AsyncScheduler(SchedulerAction, now) {
          if (now === void 0) {
              now = Scheduler.now;
          }
          var _this = _super.call(this, SchedulerAction, function () {
              if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
                  return AsyncScheduler.delegate.now();
              } else {
                  return now();
              }
          }) || this;
          _this.actions = [];
          _this.active = false;
          _this.scheduled = undefined;
          return _this;
      }
      AsyncScheduler.prototype.schedule = function (work, delay, state) {
          if (delay === void 0) {
              delay = 0;
          }
          if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
              return AsyncScheduler.delegate.schedule(work, delay, state);
          } else {
              return _super.prototype.schedule.call(this, work, delay, state);
          }
      };
      AsyncScheduler.prototype.flush = function (action) {
          var actions = this.actions;
          if (this.active) {
              actions.push(action);
              return;
          }
          var error;
          this.active = true;
          do {
              if (error = action.execute(action.state, action.delay)) {
                  break;
              }
          } while (action = actions.shift());
          this.active = false;
          if (error) {
              while (action = actions.shift()) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      return AsyncScheduler;
  }(Scheduler);

  /** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
  var QueueScheduler = /*@__PURE__*/function (_super) {
      __extends(QueueScheduler, _super);
      function QueueScheduler() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      return QueueScheduler;
  }(AsyncScheduler);

  /** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */
  var queue = /*@__PURE__*/new QueueScheduler(QueueAction);

  /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
  var EMPTY = /*@__PURE__*/new Observable(function (subscriber) {
      return subscriber.complete();
  });
  function empty$1(scheduler) {
      return scheduler ? emptyScheduled(scheduler) : EMPTY;
  }
  function emptyScheduled(scheduler) {
      return new Observable(function (subscriber) {
          return scheduler.schedule(function () {
              return subscriber.complete();
          });
      });
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isScheduler(value) {
      return value && typeof value.schedule === 'function';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var subscribeToArray = function subscribeToArray(array) {
      return function (subscriber) {
          for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
              subscriber.next(array[i]);
          }
          subscriber.complete();
      };
  };

  /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
  function scheduleArray(input, scheduler) {
      return new Observable(function (subscriber) {
          var sub = new Subscription();
          var i = 0;
          sub.add(scheduler.schedule(function () {
              if (i === input.length) {
                  subscriber.complete();
                  return;
              }
              subscriber.next(input[i++]);
              if (!subscriber.closed) {
                  sub.add(this.schedule());
              }
          }));
          return sub;
      });
  }

  /** PURE_IMPORTS_START _Observable,_util_subscribeToArray,_scheduled_scheduleArray PURE_IMPORTS_END */
  function fromArray(input, scheduler) {
      if (!scheduler) {
          return new Observable(subscribeToArray(input));
      } else {
          return scheduleArray(input, scheduler);
      }
  }

  /** PURE_IMPORTS_START _util_isScheduler,_fromArray,_scheduled_scheduleArray PURE_IMPORTS_END */
  function of() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      var scheduler = args[args.length - 1];
      if (isScheduler(scheduler)) {
          args.pop();
          return scheduleArray(args, scheduler);
      } else {
          return fromArray(args);
      }
  }

  /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
  function throwError(error, scheduler) {
      if (!scheduler) {
          return new Observable(function (subscriber) {
              return subscriber.error(error);
          });
      } else {
          return new Observable(function (subscriber) {
              return scheduler.schedule(dispatch, 0, { error: error, subscriber: subscriber });
          });
      }
  }
  function dispatch(_a) {
      var error = _a.error,
          subscriber = _a.subscriber;
      subscriber.error(error);
  }

  /** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */
  var NotificationKind;
  /*@__PURE__*/(function (NotificationKind) {
      NotificationKind["NEXT"] = "N";
      NotificationKind["ERROR"] = "E";
      NotificationKind["COMPLETE"] = "C";
  })(NotificationKind || (NotificationKind = {}));
  var Notification = /*@__PURE__*/function () {
      function Notification(kind, value, error) {
          this.kind = kind;
          this.value = value;
          this.error = error;
          this.hasValue = kind === 'N';
      }
      Notification.prototype.observe = function (observer) {
          switch (this.kind) {
              case 'N':
                  return observer.next && observer.next(this.value);
              case 'E':
                  return observer.error && observer.error(this.error);
              case 'C':
                  return observer.complete && observer.complete();
          }
      };
      Notification.prototype.do = function (next, error, complete) {
          var kind = this.kind;
          switch (kind) {
              case 'N':
                  return next && next(this.value);
              case 'E':
                  return error && error(this.error);
              case 'C':
                  return complete && complete();
          }
      };
      Notification.prototype.accept = function (nextOrObserver, error, complete) {
          if (nextOrObserver && typeof nextOrObserver.next === 'function') {
              return this.observe(nextOrObserver);
          } else {
              return this.do(nextOrObserver, error, complete);
          }
      };
      Notification.prototype.toObservable = function () {
          var kind = this.kind;
          switch (kind) {
              case 'N':
                  return of(this.value);
              case 'E':
                  return throwError(this.error);
              case 'C':
                  return empty$1();
          }
          throw new Error('unexpected notification kind value');
      };
      Notification.createNext = function (value) {
          if (typeof value !== 'undefined') {
              return new Notification('N', value);
          }
          return Notification.undefinedValueNotification;
      };
      Notification.createError = function (err) {
          return new Notification('E', undefined, err);
      };
      Notification.createComplete = function () {
          return Notification.completeNotification;
      };
      Notification.completeNotification = new Notification('C');
      Notification.undefinedValueNotification = new Notification('N', undefined);
      return Notification;
  }();

  /** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */

  var ObserveOnSubscriber = /*@__PURE__*/function (_super) {
      __extends(ObserveOnSubscriber, _super);
      function ObserveOnSubscriber(destination, scheduler, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          var _this = _super.call(this, destination) || this;
          _this.scheduler = scheduler;
          _this.delay = delay;
          return _this;
      }
      ObserveOnSubscriber.dispatch = function (arg) {
          var notification = arg.notification,
              destination = arg.destination;
          notification.observe(destination);
          this.unsubscribe();
      };
      ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
          var destination = this.destination;
          destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
      };
      ObserveOnSubscriber.prototype._next = function (value) {
          this.scheduleMessage(Notification.createNext(value));
      };
      ObserveOnSubscriber.prototype._error = function (err) {
          this.scheduleMessage(Notification.createError(err));
          this.unsubscribe();
      };
      ObserveOnSubscriber.prototype._complete = function () {
          this.scheduleMessage(Notification.createComplete());
          this.unsubscribe();
      };
      return ObserveOnSubscriber;
  }(Subscriber);
  var ObserveOnMessage = /*@__PURE__*/function () {
      function ObserveOnMessage(notification, destination) {
          this.notification = notification;
          this.destination = destination;
      }
      return ObserveOnMessage;
  }();

  /** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */
  var ReplaySubject = /*@__PURE__*/function (_super) {
      __extends(ReplaySubject, _super);
      function ReplaySubject(bufferSize, windowTime, scheduler) {
          if (bufferSize === void 0) {
              bufferSize = Number.POSITIVE_INFINITY;
          }
          if (windowTime === void 0) {
              windowTime = Number.POSITIVE_INFINITY;
          }
          var _this = _super.call(this) || this;
          _this.scheduler = scheduler;
          _this._events = [];
          _this._infiniteTimeWindow = false;
          _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
          _this._windowTime = windowTime < 1 ? 1 : windowTime;
          if (windowTime === Number.POSITIVE_INFINITY) {
              _this._infiniteTimeWindow = true;
              _this.next = _this.nextInfiniteTimeWindow;
          } else {
              _this.next = _this.nextTimeWindow;
          }
          return _this;
      }
      ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
          var _events = this._events;
          _events.push(value);
          if (_events.length > this._bufferSize) {
              _events.shift();
          }
          _super.prototype.next.call(this, value);
      };
      ReplaySubject.prototype.nextTimeWindow = function (value) {
          this._events.push(new ReplayEvent(this._getNow(), value));
          this._trimBufferThenGetEvents();
          _super.prototype.next.call(this, value);
      };
      ReplaySubject.prototype._subscribe = function (subscriber) {
          var _infiniteTimeWindow = this._infiniteTimeWindow;
          var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
          var scheduler = this.scheduler;
          var len = _events.length;
          var subscription;
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          } else if (this.isStopped || this.hasError) {
              subscription = Subscription.EMPTY;
          } else {
              this.observers.push(subscriber);
              subscription = new SubjectSubscription(this, subscriber);
          }
          if (scheduler) {
              subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
          }
          if (_infiniteTimeWindow) {
              for (var i = 0; i < len && !subscriber.closed; i++) {
                  subscriber.next(_events[i]);
              }
          } else {
              for (var i = 0; i < len && !subscriber.closed; i++) {
                  subscriber.next(_events[i].value);
              }
          }
          if (this.hasError) {
              subscriber.error(this.thrownError);
          } else if (this.isStopped) {
              subscriber.complete();
          }
          return subscription;
      };
      ReplaySubject.prototype._getNow = function () {
          return (this.scheduler || queue).now();
      };
      ReplaySubject.prototype._trimBufferThenGetEvents = function () {
          var now = this._getNow();
          var _bufferSize = this._bufferSize;
          var _windowTime = this._windowTime;
          var _events = this._events;
          var eventsCount = _events.length;
          var spliceCount = 0;
          while (spliceCount < eventsCount) {
              if (now - _events[spliceCount].time < _windowTime) {
                  break;
              }
              spliceCount++;
          }
          if (eventsCount > _bufferSize) {
              spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
          }
          if (spliceCount > 0) {
              _events.splice(0, spliceCount);
          }
          return _events;
      };
      return ReplaySubject;
  }(Subject);
  var ReplayEvent = /*@__PURE__*/function () {
      function ReplayEvent(time, value) {
          this.time = time;
          this.value = value;
      }
      return ReplayEvent;
  }();

  /** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */
  var AsyncSubject = /*@__PURE__*/function (_super) {
      __extends(AsyncSubject, _super);
      function AsyncSubject() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.value = null;
          _this.hasNext = false;
          _this.hasCompleted = false;
          return _this;
      }
      AsyncSubject.prototype._subscribe = function (subscriber) {
          if (this.hasError) {
              subscriber.error(this.thrownError);
              return Subscription.EMPTY;
          } else if (this.hasCompleted && this.hasNext) {
              subscriber.next(this.value);
              subscriber.complete();
              return Subscription.EMPTY;
          }
          return _super.prototype._subscribe.call(this, subscriber);
      };
      AsyncSubject.prototype.next = function (value) {
          if (!this.hasCompleted) {
              this.value = value;
              this.hasNext = true;
          }
      };
      AsyncSubject.prototype.error = function (error) {
          if (!this.hasCompleted) {
              _super.prototype.error.call(this, error);
          }
      };
      AsyncSubject.prototype.complete = function () {
          this.hasCompleted = true;
          if (this.hasNext) {
              _super.prototype.next.call(this, this.value);
          }
          _super.prototype.complete.call(this);
      };
      return AsyncSubject;
  }(Subject);

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var nextHandle = 1;
  var tasksByHandle = {};
  function runIfPresent(handle) {
      var cb = tasksByHandle[handle];
      if (cb) {
          cb();
      }
  }
  var Immediate = {
      setImmediate: function setImmediate(cb) {
          var handle = nextHandle++;
          tasksByHandle[handle] = cb;
          Promise.resolve().then(function () {
              return runIfPresent(handle);
          });
          return handle;
      },
      clearImmediate: function clearImmediate(handle) {
          delete tasksByHandle[handle];
      }
  };

  /** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */
  var AsapAction = /*@__PURE__*/function (_super) {
      __extends(AsapAction, _super);
      function AsapAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
      }
      AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (delay !== null && delay > 0) {
              return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          scheduler.actions.push(this);
          return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
      };
      AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
              return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
          }
          if (scheduler.actions.length === 0) {
              Immediate.clearImmediate(id);
              scheduler.scheduled = undefined;
          }
          return undefined;
      };
      return AsapAction;
  }(AsyncAction);

  /** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
  var AsapScheduler = /*@__PURE__*/function (_super) {
      __extends(AsapScheduler, _super);
      function AsapScheduler() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      AsapScheduler.prototype.flush = function (action) {
          this.active = true;
          this.scheduled = undefined;
          var actions = this.actions;
          var error;
          var index = -1;
          var count = actions.length;
          action = action || actions.shift();
          do {
              if (error = action.execute(action.state, action.delay)) {
                  break;
              }
          } while (++index < count && (action = actions.shift()));
          this.active = false;
          if (error) {
              while (++index < count && (action = actions.shift())) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      return AsapScheduler;
  }(AsyncScheduler);

  /** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */
  var asap = /*@__PURE__*/new AsapScheduler(AsapAction);

  /** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
  var async = /*@__PURE__*/new AsyncScheduler(AsyncAction);

  /** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */
  var AnimationFrameAction = /*@__PURE__*/function (_super) {
      __extends(AnimationFrameAction, _super);
      function AnimationFrameAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
      }
      AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (delay !== null && delay > 0) {
              return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          scheduler.actions.push(this);
          return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () {
              return scheduler.flush(null);
          }));
      };
      AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
              return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
          }
          if (scheduler.actions.length === 0) {
              cancelAnimationFrame(id);
              scheduler.scheduled = undefined;
          }
          return undefined;
      };
      return AnimationFrameAction;
  }(AsyncAction);

  /** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
  var AnimationFrameScheduler = /*@__PURE__*/function (_super) {
      __extends(AnimationFrameScheduler, _super);
      function AnimationFrameScheduler() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      AnimationFrameScheduler.prototype.flush = function (action) {
          this.active = true;
          this.scheduled = undefined;
          var actions = this.actions;
          var error;
          var index = -1;
          var count = actions.length;
          action = action || actions.shift();
          do {
              if (error = action.execute(action.state, action.delay)) {
                  break;
              }
          } while (++index < count && (action = actions.shift()));
          this.active = false;
          if (error) {
              while (++index < count && (action = actions.shift())) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      return AnimationFrameScheduler;
  }(AsyncScheduler);

  /** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */
  var animationFrame = /*@__PURE__*/new AnimationFrameScheduler(AnimationFrameAction);

  /** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
  var VirtualTimeScheduler = /*@__PURE__*/function (_super) {
      __extends(VirtualTimeScheduler, _super);
      function VirtualTimeScheduler(SchedulerAction, maxFrames) {
          if (SchedulerAction === void 0) {
              SchedulerAction = VirtualAction;
          }
          if (maxFrames === void 0) {
              maxFrames = Number.POSITIVE_INFINITY;
          }
          var _this = _super.call(this, SchedulerAction, function () {
              return _this.frame;
          }) || this;
          _this.maxFrames = maxFrames;
          _this.frame = 0;
          _this.index = -1;
          return _this;
      }
      VirtualTimeScheduler.prototype.flush = function () {
          var _a = this,
              actions = _a.actions,
              maxFrames = _a.maxFrames;
          var error, action;
          while ((action = actions[0]) && action.delay <= maxFrames) {
              actions.shift();
              this.frame = action.delay;
              if (error = action.execute(action.state, action.delay)) {
                  break;
              }
          }
          if (error) {
              while (action = actions.shift()) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      VirtualTimeScheduler.frameTimeFactor = 10;
      return VirtualTimeScheduler;
  }(AsyncScheduler);
  var VirtualAction = /*@__PURE__*/function (_super) {
      __extends(VirtualAction, _super);
      function VirtualAction(scheduler, work, index) {
          if (index === void 0) {
              index = scheduler.index += 1;
          }
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.index = index;
          _this.active = true;
          _this.index = scheduler.index = index;
          return _this;
      }
      VirtualAction.prototype.schedule = function (state, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (!this.id) {
              return _super.prototype.schedule.call(this, state, delay);
          }
          this.active = false;
          var action = new VirtualAction(this.scheduler, this.work);
          this.add(action);
          return action.schedule(state, delay);
      };
      VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          this.delay = scheduler.frame + delay;
          var actions = scheduler.actions;
          actions.push(this);
          actions.sort(VirtualAction.sortActions);
          return true;
      };
      VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          return undefined;
      };
      VirtualAction.prototype._execute = function (state, delay) {
          if (this.active === true) {
              return _super.prototype._execute.call(this, state, delay);
          }
      };
      VirtualAction.sortActions = function (a, b) {
          if (a.delay === b.delay) {
              if (a.index === b.index) {
                  return 0;
              } else if (a.index > b.index) {
                  return 1;
              } else {
                  return -1;
              }
          } else if (a.delay > b.delay) {
              return 1;
          } else {
              return -1;
          }
      };
      return VirtualAction;
  }(AsyncAction);

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

  var MapSubscriber = /*@__PURE__*/function (_super) {
      __extends(MapSubscriber, _super);
      function MapSubscriber(destination, project, thisArg) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.count = 0;
          _this.thisArg = thisArg || _this;
          return _this;
      }
      MapSubscriber.prototype._next = function (value) {
          var result;
          try {
              result = this.project.call(this.thisArg, value, this.count++);
          } catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(result);
      };
      return MapSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isArray,_util_isScheduler PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isScheduler,_util_isArray PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  var OuterSubscriber = /*@__PURE__*/function (_super) {
      __extends(OuterSubscriber, _super);
      function OuterSubscriber() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.destination.next(innerValue);
      };
      OuterSubscriber.prototype.notifyError = function (error, innerSub) {
          this.destination.error(error);
      };
      OuterSubscriber.prototype.notifyComplete = function (innerSub) {
          this.destination.complete();
      };
      return OuterSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  var InnerSubscriber = /*@__PURE__*/function (_super) {
      __extends(InnerSubscriber, _super);
      function InnerSubscriber(parent, outerValue, outerIndex) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          _this.outerValue = outerValue;
          _this.outerIndex = outerIndex;
          _this.index = 0;
          return _this;
      }
      InnerSubscriber.prototype._next = function (value) {
          this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
      };
      InnerSubscriber.prototype._error = function (error) {
          this.parent.notifyError(error, this);
          this.unsubscribe();
      };
      InnerSubscriber.prototype._complete = function () {
          this.parent.notifyComplete(this);
          this.unsubscribe();
      };
      return InnerSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */
  var subscribeToPromise = function subscribeToPromise(promise) {
      return function (subscriber) {
          promise.then(function (value) {
              if (!subscriber.closed) {
                  subscriber.next(value);
                  subscriber.complete();
              }
          }, function (err) {
              return subscriber.error(err);
          }).then(null, hostReportError);
          return subscriber;
      };
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function getSymbolIterator() {
      if (typeof Symbol !== 'function' || !Symbol.iterator) {
          return '@@iterator';
      }
      return Symbol.iterator;
  }
  var iterator = /*@__PURE__*/getSymbolIterator();

  /** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
  var subscribeToIterable = function subscribeToIterable(iterable) {
      return function (subscriber) {
          var iterator$$1 = iterable[iterator]();
          do {
              var item = iterator$$1.next();
              if (item.done) {
                  subscriber.complete();
                  break;
              }
              subscriber.next(item.value);
              if (subscriber.closed) {
                  break;
              }
          } while (true);
          if (typeof iterator$$1.return === 'function') {
              subscriber.add(function () {
                  if (iterator$$1.return) {
                      iterator$$1.return();
                  }
              });
          }
          return subscriber;
      };
  };

  /** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
  var subscribeToObservable = function subscribeToObservable(obj) {
      return function (subscriber) {
          var obs = obj[observable]();
          if (typeof obs.subscribe !== 'function') {
              throw new TypeError('Provided object does not correctly implement Symbol.observable');
          } else {
              return obs.subscribe(subscriber);
          }
      };
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var isArrayLike = function isArrayLike(x) {
    return x && typeof x.length === 'number' && typeof x !== 'function';
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isPromise(value) {
      return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
  }

  /** PURE_IMPORTS_START _subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */
  var subscribeTo = function subscribeTo(result) {
      if (!!result && typeof result[observable] === 'function') {
          return subscribeToObservable(result);
      } else if (isArrayLike(result)) {
          return subscribeToArray(result);
      } else if (isPromise(result)) {
          return subscribeToPromise(result);
      } else if (!!result && typeof result[iterator] === 'function') {
          return subscribeToIterable(result);
      } else {
          var value = isObject$3(result) ? 'an invalid object' : "'" + result + "'";
          var msg = "You provided " + value + " where a stream was expected." + ' You can provide an Observable, Promise, Array, or Iterable.';
          throw new TypeError(msg);
      }
  };

  /** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo,_Observable PURE_IMPORTS_END */
  function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
      if (destination === void 0) {
          destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
      }
      if (destination.closed) {
          return undefined;
      }
      if (result instanceof Observable) {
          return result.subscribe(destination);
      }
      return subscribeTo(result)(destination);
  }

  /** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */
  var NONE = {};

  var CombineLatestSubscriber = /*@__PURE__*/function (_super) {
      __extends(CombineLatestSubscriber, _super);
      function CombineLatestSubscriber(destination, resultSelector) {
          var _this = _super.call(this, destination) || this;
          _this.resultSelector = resultSelector;
          _this.active = 0;
          _this.values = [];
          _this.observables = [];
          return _this;
      }
      CombineLatestSubscriber.prototype._next = function (observable) {
          this.values.push(NONE);
          this.observables.push(observable);
      };
      CombineLatestSubscriber.prototype._complete = function () {
          var observables = this.observables;
          var len = observables.length;
          if (len === 0) {
              this.destination.complete();
          } else {
              this.active = len;
              this.toRespond = len;
              for (var i = 0; i < len; i++) {
                  var observable = observables[i];
                  this.add(subscribeToResult(this, observable, observable, i));
              }
          }
      };
      CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
          if ((this.active -= 1) === 0) {
              this.destination.complete();
          }
      };
      CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          var values = this.values;
          var oldVal = values[outerIndex];
          var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
          values[outerIndex] = innerValue;
          if (toRespond === 0) {
              if (this.resultSelector) {
                  this._tryResultSelector(values);
              } else {
                  this.destination.next(values.slice());
              }
          }
      };
      CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
          var result;
          try {
              result = this.resultSelector.apply(this, values);
          } catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(result);
      };
      return CombineLatestSubscriber;
  }(OuterSubscriber);

  /** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _scheduleObservable,_schedulePromise,_scheduleArray,_scheduleIterable,_util_isInteropObservable,_util_isPromise,_util_isArrayLike,_util_isIterable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_subscribeTo,_scheduled_scheduled PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber,_map,_observable_from PURE_IMPORTS_END */

  var MergeMapSubscriber = /*@__PURE__*/function (_super) {
      __extends(MergeMapSubscriber, _super);
      function MergeMapSubscriber(destination, project, concurrent) {
          if (concurrent === void 0) {
              concurrent = Number.POSITIVE_INFINITY;
          }
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.concurrent = concurrent;
          _this.hasCompleted = false;
          _this.buffer = [];
          _this.active = 0;
          _this.index = 0;
          return _this;
      }
      MergeMapSubscriber.prototype._next = function (value) {
          if (this.active < this.concurrent) {
              this._tryNext(value);
          } else {
              this.buffer.push(value);
          }
      };
      MergeMapSubscriber.prototype._tryNext = function (value) {
          var result;
          var index = this.index++;
          try {
              result = this.project(value, index);
          } catch (err) {
              this.destination.error(err);
              return;
          }
          this.active++;
          this._innerSub(result, value, index);
      };
      MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
          var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
          var destination = this.destination;
          destination.add(innerSubscriber);
          subscribeToResult(this, ish, value, index, innerSubscriber);
      };
      MergeMapSubscriber.prototype._complete = function () {
          this.hasCompleted = true;
          if (this.active === 0 && this.buffer.length === 0) {
              this.destination.complete();
          }
          this.unsubscribe();
      };
      MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.destination.next(innerValue);
      };
      MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
          var buffer = this.buffer;
          this.remove(innerSub);
          this.active--;
          if (buffer.length > 0) {
              this._next(buffer.shift());
          } else if (this.active === 0 && this.hasCompleted) {
              this.destination.complete();
          }
      };
      return MergeMapSubscriber;
  }(OuterSubscriber);

  /** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _of,_operators_concatAll PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_isArray,_operators_map,_util_isObject,_from PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

  var FilterSubscriber = /*@__PURE__*/function (_super) {
      __extends(FilterSubscriber, _super);
      function FilterSubscriber(destination, predicate, thisArg) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.thisArg = thisArg;
          _this.count = 0;
          return _this;
      }
      FilterSubscriber.prototype._next = function (value) {
          var result;
          try {
              result = this.predicate.call(this.thisArg, value, this.count++);
          } catch (err) {
              this.destination.error(err);
              return;
          }
          if (result) {
              this.destination.next(value);
          }
      };
      return FilterSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START _util_not,_util_subscribeTo,_operators_filter,_Observable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

  var RaceSubscriber = /*@__PURE__*/function (_super) {
      __extends(RaceSubscriber, _super);
      function RaceSubscriber(destination) {
          var _this = _super.call(this, destination) || this;
          _this.hasFirst = false;
          _this.observables = [];
          _this.subscriptions = [];
          return _this;
      }
      RaceSubscriber.prototype._next = function (observable) {
          this.observables.push(observable);
      };
      RaceSubscriber.prototype._complete = function () {
          var observables = this.observables;
          var len = observables.length;
          if (len === 0) {
              this.destination.complete();
          } else {
              for (var i = 0; i < len && !this.hasFirst; i++) {
                  var observable = observables[i];
                  var subscription = subscribeToResult(this, observable, observable, i);
                  if (this.subscriptions) {
                      this.subscriptions.push(subscription);
                  }
                  this.add(subscription);
              }
              this.observables = null;
          }
      };
      RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          if (!this.hasFirst) {
              this.hasFirst = true;
              for (var i = 0; i < this.subscriptions.length; i++) {
                  if (i !== outerIndex) {
                      var subscription = this.subscriptions[i];
                      subscription.unsubscribe();
                      this.remove(subscription);
                  }
              }
              this.subscriptions = null;
          }
          this.destination.next(innerValue);
      };
      return RaceSubscriber;
  }(OuterSubscriber);

  /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_OuterSubscriber,_util_subscribeToResult,_.._internal_symbol_iterator PURE_IMPORTS_END */

  var ZipSubscriber = /*@__PURE__*/function (_super) {
      __extends(ZipSubscriber, _super);
      function ZipSubscriber(destination, resultSelector, values) {
          if (values === void 0) {
              values = Object.create(null);
          }
          var _this = _super.call(this, destination) || this;
          _this.iterators = [];
          _this.active = 0;
          _this.resultSelector = typeof resultSelector === 'function' ? resultSelector : null;
          _this.values = values;
          return _this;
      }
      ZipSubscriber.prototype._next = function (value) {
          var iterators = this.iterators;
          if (isArray$3(value)) {
              iterators.push(new StaticArrayIterator(value));
          } else if (typeof value[iterator] === 'function') {
              iterators.push(new StaticIterator(value[iterator]()));
          } else {
              iterators.push(new ZipBufferIterator(this.destination, this, value));
          }
      };
      ZipSubscriber.prototype._complete = function () {
          var iterators = this.iterators;
          var len = iterators.length;
          this.unsubscribe();
          if (len === 0) {
              this.destination.complete();
              return;
          }
          this.active = len;
          for (var i = 0; i < len; i++) {
              var iterator$$1 = iterators[i];
              if (iterator$$1.stillUnsubscribed) {
                  var destination = this.destination;
                  destination.add(iterator$$1.subscribe(iterator$$1, i));
              } else {
                  this.active--;
              }
          }
      };
      ZipSubscriber.prototype.notifyInactive = function () {
          this.active--;
          if (this.active === 0) {
              this.destination.complete();
          }
      };
      ZipSubscriber.prototype.checkIterators = function () {
          var iterators = this.iterators;
          var len = iterators.length;
          var destination = this.destination;
          for (var i = 0; i < len; i++) {
              var iterator$$1 = iterators[i];
              if (typeof iterator$$1.hasValue === 'function' && !iterator$$1.hasValue()) {
                  return;
              }
          }
          var shouldComplete = false;
          var args = [];
          for (var i = 0; i < len; i++) {
              var iterator$$1 = iterators[i];
              var result = iterator$$1.next();
              if (iterator$$1.hasCompleted()) {
                  shouldComplete = true;
              }
              if (result.done) {
                  destination.complete();
                  return;
              }
              args.push(result.value);
          }
          if (this.resultSelector) {
              this._tryresultSelector(args);
          } else {
              destination.next(args);
          }
          if (shouldComplete) {
              destination.complete();
          }
      };
      ZipSubscriber.prototype._tryresultSelector = function (args) {
          var result;
          try {
              result = this.resultSelector.apply(this, args);
          } catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(result);
      };
      return ZipSubscriber;
  }(Subscriber);
  var StaticIterator = /*@__PURE__*/function () {
      function StaticIterator(iterator$$1) {
          this.iterator = iterator$$1;
          this.nextResult = iterator$$1.next();
      }
      StaticIterator.prototype.hasValue = function () {
          return true;
      };
      StaticIterator.prototype.next = function () {
          var result = this.nextResult;
          this.nextResult = this.iterator.next();
          return result;
      };
      StaticIterator.prototype.hasCompleted = function () {
          var nextResult = this.nextResult;
          return nextResult && nextResult.done;
      };
      return StaticIterator;
  }();
  var StaticArrayIterator = /*@__PURE__*/function () {
      function StaticArrayIterator(array) {
          this.array = array;
          this.index = 0;
          this.length = 0;
          this.length = array.length;
      }
      StaticArrayIterator.prototype[iterator] = function () {
          return this;
      };
      StaticArrayIterator.prototype.next = function (value) {
          var i = this.index++;
          var array = this.array;
          return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
      };
      StaticArrayIterator.prototype.hasValue = function () {
          return this.array.length > this.index;
      };
      StaticArrayIterator.prototype.hasCompleted = function () {
          return this.array.length === this.index;
      };
      return StaticArrayIterator;
  }();
  var ZipBufferIterator = /*@__PURE__*/function (_super) {
      __extends(ZipBufferIterator, _super);
      function ZipBufferIterator(destination, parent, observable) {
          var _this = _super.call(this, destination) || this;
          _this.parent = parent;
          _this.observable = observable;
          _this.stillUnsubscribed = true;
          _this.buffer = [];
          _this.isComplete = false;
          return _this;
      }
      ZipBufferIterator.prototype[iterator] = function () {
          return this;
      };
      ZipBufferIterator.prototype.next = function () {
          var buffer = this.buffer;
          if (buffer.length === 0 && this.isComplete) {
              return { value: null, done: true };
          } else {
              return { value: buffer.shift(), done: false };
          }
      };
      ZipBufferIterator.prototype.hasValue = function () {
          return this.buffer.length > 0;
      };
      ZipBufferIterator.prototype.hasCompleted = function () {
          return this.buffer.length === 0 && this.isComplete;
      };
      ZipBufferIterator.prototype.notifyComplete = function () {
          if (this.buffer.length > 0) {
              this.isComplete = true;
              this.parent.notifyInactive();
          } else {
              this.destination.complete();
          }
      };
      ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.buffer.push(innerValue);
          this.parent.checkIterators();
      };
      ZipBufferIterator.prototype.subscribe = function (value, index) {
          return subscribeToResult(this, this.observable, this, index);
      };
      return ZipBufferIterator;
  }(OuterSubscriber);

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /**
   * @this {Promise}
   */
  function finallyConstructor(callback) {
    var constructor = this.constructor;
    return this.then(function (value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        // @ts-ignore
        return constructor.reject(reason);
      });
    });
  }

  var _typeof$8 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function isArray$4(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }

  function noop$1() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  /**
   * @constructor
   * @param {Function} fn
   */
  function Promise$1(fn) {
    if (!(this instanceof Promise$1)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    /** @type {!number} */
    this._state = 0;
    /** @type {!boolean} */
    this._handled = false;
    /** @type {Promise|undefined} */
    this._value = undefined;
    /** @type {!Array<!Function>} */
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise$1._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof$8(newValue)) === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise$1) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise$1._immediateFn(function () {
        if (!self._handled) {
          Promise$1._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  /**
   * @constructor
   */
  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise$1.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise$1.prototype.then = function (onFulfilled, onRejected) {
    // @ts-ignore
    var prom = new this.constructor(noop$1);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise$1.prototype['finally'] = finallyConstructor;

  Promise$1.all = function (arr) {
    return new Promise$1(function (resolve, reject) {
      if (!isArray$4(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }

      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof$8(val)) === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise$1.resolve = function (value) {
    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof$8(value)) === 'object' && value.constructor === Promise$1) {
      return value;
    }

    return new Promise$1(function (resolve) {
      resolve(value);
    });
  };

  Promise$1.reject = function (value) {
    return new Promise$1(function (resolve, reject) {
      reject(value);
    });
  };

  Promise$1.race = function (arr) {
    return new Promise$1(function (resolve, reject) {
      if (!isArray$4(arr)) {
        return reject(new TypeError('Promise.race accepts an array'));
      }

      for (var i = 0, len = arr.length; i < len; i++) {
        Promise$1.resolve(arr[i]).then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise$1._immediateFn =
  // @ts-ignore
  typeof setImmediate === 'function' && function (fn) {
    // @ts-ignore
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", { value: function value(r, e) {
      if (null == this) throw new TypeError('"this" is null or not defined');var t = Object(this),
          n = t.length >>> 0;if (0 === n) return !1;for (var i = 0 | e, o = Math.max(i >= 0 ? i : n - Math.abs(i), 0); o < n;) {
        if (function (r, e) {
          return r === e || "number" == typeof r && "number" == typeof e && isNaN(r) && isNaN(e);
        }(t[o], r)) return !0;o++;
      }return !1;
    } });

  var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
   * The above copyright notice and this permission notice (including the next
   * paragraph) shall be included in all copies or substantial portions of the
   * Software.
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

  var Request = function () {
      function Request(method, url, responseType, headers, eventType, data) {
          _classCallCheck$8(this, Request);

          this.eventType = "promise";
          this.log = Logger.addGroup("Aias");
          this.method = method;
          this.url = url;
          this.responseType = responseType;
          this.async = true;
          this.noCache = false;
          this.headers = headers;
          this.eventType = eventType || this.eventType;
          this.data = data || null;
      }

      _createClass$6(Request, [{
          key: 'call',
          value: function call() {
              switch (this.eventType) {
                  case "observable":
                      return this.useObservable(this.url, this.responseType, this.data);
                  default:
                      return this.usePromise(this.url, this.responseType, this.data);
              }
          }
      }, {
          key: 'usePromise',
          value: function usePromise(url, responseType, data) {
              var _this = this;

              return new Promise$1(function (resolve, reject) {
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
          key: 'useObservable',
          value: function useObservable(url, responseType, data) {
              var _this2 = this;

              return new Observable(function (observer) {
                  var http = new XMLHttpRequest();
                  url += _this2.noCache ? "?cache=" + new Date().getTime() : "";
                  http.open(_this2.method, url, _this2.async);
                  http.responseType = responseType === "audiobuffer" ? "arraybuffer" : responseType;
                  _this2.setRequestHeaders(http);
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
                                          _this2.logInfo(url, http.status, http.statusText);
                                          if (responseType === "audiobuffer") {
                                              if (AudioContext) {
                                                  var audioContext = new AudioContext();
                                                  audioContext.decodeAudioData(response, function (buffer) {
                                                      audioContext.close();
                                                      observer.next(buffer);
                                                      observer.complete();
                                                  }, function (error) {
                                                      _this2.log.error("xhr (" + _this2.method + ":" + url + ") failed with decodeAudioData error : " + error.message);
                                                      audioContext.close();
                                                      observer.error({
                                                          status: error.name,
                                                          statusText: error.message
                                                      });
                                                      observer.complete();
                                                  });
                                              } else {
                                                  _this2.log.error("xhr (" + _this2.method + ":" + url + ") failed with error : " + "Web Audio API is not supported by your browser.");
                                                  observer.error({
                                                      status: "Web Audio API not supported by your browser",
                                                      statusText: "Web Audio API is not supported by your browser"
                                                  });
                                                  observer.complete();
                                              }
                                          } else {
                                              observer.next(response);
                                              observer.complete();
                                          }
                                      } else {
                                          _this2.logError(url, http.status, http.statusText);
                                          observer.error({
                                              status: http.status,
                                              statusText: http.statusText
                                          });
                                          observer.complete();
                                      }
                                  } else {
                                      _this2.logError(url, http.status, http.statusText);
                                      observer.error({
                                          status: http.status,
                                          statusText: http.statusText
                                      });
                                      observer.complete();
                                  }
                              }
                          };
                          break;
                      default:
                          http.onreadystatechange = function () {
                              if (http.readyState == 4) {
                                  if (http.status == 200) {
                                      _this2.logInfo(url, http.status, http.statusText);
                                      observer.next(http.responseText);
                                      observer.complete();
                                  } else {
                                      _this2.logError(url, http.status, http.statusText);
                                      observer.error({
                                          status: http.status,
                                          statusText: http.statusText
                                      });
                                      observer.complete();
                                  }
                              }
                          };
                  }
                  if (isObject$2(data)) {
                      data = JSON.stringify(data);
                  }
                  http.send(data || null);
                  _this2.log.info("xhr (" + _this2.method + ":" + url + ")" + "sent");
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

      return Request;
  }();

  var HTTPHeaders = function HTTPHeaders() {
      _classCallCheck$8(this, HTTPHeaders);
  };

  var METHODS = {
      GET: {
          type: "GET",
          defaultHeaders: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          headers: {},
          data: false
      },
      HEAD: {
          type: "HEAD",
          defaultHeaders: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          headers: {},
          data: false
      },
      POST: {
          type: "POST",
          defaultHeaders: {
              "Content-Type": "application/json"
          },
          headers: {},
          data: true
      },
      PUT: {
          type: "PUT",
          defaultHeaders: {
              "Content-Type": "application/json"
          },
          headers: {},
          data: true
      },
      DELETE: {
          type: "DELETE",
          defaultHeaders: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          headers: {},
          data: false
      },
      CONNECT: {
          type: "CONNECT",
          defaultHeaders: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          headers: {},
          data: false
      },
      OPTIONS: {
          type: "OPTIONS",
          defaultHeaders: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          headers: {},
          data: false
      },
      TRACE: {
          type: "TRACE",
          defaultHeaders: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          headers: {},
          data: false
      },
      PATCH: {
          type: "PATCH",
          defaultHeaders: {
              "Content-Type": "application/json"
          },
          headers: {},
          data: false
      }
  };

  var HTTP = function () {
      function HTTP() {
          _classCallCheck$8(this, HTTP);
      }

      _createClass$6(HTTP, null, [{
          key: 'setEventType',
          value: function setEventType(eventType) {
              this.eventType = this.isOfTypeEventType(eventType) ? eventType : "promise";
          }
      }, {
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
          key: 'setHeaders',
          value: function setHeaders(method, headers) {
              if (METHODS.hasOwnProperty(method)) {
                  for (var property in headers) {
                      if (headers.hasOwnProperty(property) && HTTPHeaders.hasOwnProperty(property)) {
                          METHODS[method].headers[property] = headers[property];
                      }
                  }
              }
          }
      }, {
          key: 'setMockup',
          value: function setMockup(mockup) {
              var _a, _b;
              this.mockup.data = (_a = mockup.data, _a !== null && _a !== void 0 ? _a : this.mockup.data);
              this.mockup.delay = (_b = mockup.delay, _b !== null && _b !== void 0 ? _b : this.mockup.delay);
              return this.mockup;
          }
      }, {
          key: 'getMockupData',
          value: function getMockupData() {
              var _this3 = this;

              switch (this.eventType) {
                  case "observable":
                      return new Observable(function (observer) {
                          setTimeout(function () {
                              if (_this3.mockup.data) {
                                  observer.next(_this3.mockup.data);
                                  observer.complete();
                              } else {
                                  observer.error(null);
                              }
                          }, _this3.mockup.delay);
                      });
                  default:
                      return this.promiseTimeout().then(function () {
                          return new Promise$1(function (resolve, reject) {
                              _this3.mockup.data ? resolve(_this3.mockup.data) : reject(null);
                          });
                      });
              }
          }
      }, {
          key: 'get',
          value: function get(url, responseType) {
              return this.request(METHODS.GET.type, url, responseType, METHODS.GET.headers || METHODS.GET.defaultHeaders, null);
          }
      }, {
          key: 'head',
          value: function head(url, responseType) {
              return this.request(METHODS.HEAD.type, url, responseType, METHODS.HEAD.headers || METHODS.HEAD.defaultHeaders, null);
          }
      }, {
          key: 'post',
          value: function post(url, responseType, data) {
              return this.request(METHODS.POST.type, url, responseType, METHODS.POST.headers || METHODS.POST.defaultHeaders, data);
          }
      }, {
          key: 'put',
          value: function put(url, responseType, data) {
              return this.request(METHODS.PUT.type, url, responseType, METHODS.PUT.headers || METHODS.PUT.defaultHeaders, data);
          }
      }, {
          key: 'delete',
          value: function _delete(url, responseType) {
              return this.request(METHODS.DELETE.type, url, responseType, METHODS.DELETE.headers || METHODS.DELETE.defaultHeaders, null);
          }
      }, {
          key: 'connect',
          value: function connect(url, responseType) {
              return this.request(METHODS.CONNECT.type, url, responseType, METHODS.CONNECT.headers || METHODS.CONNECT.defaultHeaders, null);
          }
      }, {
          key: 'options',
          value: function options(url, responseType) {
              return this.request(METHODS.OPTIONS.type, url, responseType, METHODS.OPTIONS.headers || METHODS.OPTIONS.defaultHeaders, null);
          }
      }, {
          key: 'trace',
          value: function trace(url, responseType) {
              return this.request(METHODS.TRACE.type, url, responseType, METHODS.TRACE.headers || METHODS.TRACE.defaultHeaders, null);
          }
      }, {
          key: 'patch',
          value: function patch(url, responseType, data) {
              return this.request(METHODS.PATCH.type, url, responseType, METHODS.PATCH.headers || METHODS.PATCH.defaultHeaders, data);
          }
      }, {
          key: 'request',
          value: function request(type, url, responseType, headers, data) {
              if (this.mockup.data) {
                  return this.getMockupData();
              } else {
                  var request = new Request(type, url, responseType, headers, this.eventType, data || null);
                  return request.call();
              }
          }
      }, {
          key: 'promiseTimeout',
          value: function promiseTimeout() {
              var _this4 = this;

              return new Promise$1(function (resolve) {
                  return setTimeout(resolve, _this4.mockup.delay);
              });
          }
      }, {
          key: 'isOfTypeEventType',
          value: function isOfTypeEventType(eventType) {
              return ["promise", "observable"].includes(eventType);
          }
      }]);

      return HTTP;
  }();

  HTTP.log = Logger.addGroup("Aias");
  HTTP.eventType = "promise";
  HTTP.mockup = {
      data: null,
      delay: 200
  };

  function loadSound(path) {
      return HTTP.get(path, "audiobuffer");
  }

  function loadFile(path) {
      return HTTP.get(path, "text");
  }

  var Request$1 = function () {
      function Request() {
          this.fsm = new FSM$1([{ name: "send", from: "idle", to: "pending" }, { name: "success", from: "pending", to: "success" }, { name: "error", from: "pending", to: "error" }]);
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
          this.request = new Request$1();
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
                          type.files[i] = new Asset(file.name, this.path + "/" + folder, file.params || null);
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
