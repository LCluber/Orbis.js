import * as WEE from '../../bower_components/Weejs/dist/wee';
import * as MOUETTE from '../../bower_components/Mouettejs/dist/mouette';
import * as TAIPAN from '../../bower_components/Taipanjs/dist/taipan';
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
export { Request };
;
//# sourceMappingURL=request.js.map