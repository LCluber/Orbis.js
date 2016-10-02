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