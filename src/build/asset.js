import * as WEE from '../../bower_components/Weejs/dist/wee';
import { Request } from './request';
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
export { Asset };
//# sourceMappingURL=asset.js.map