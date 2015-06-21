var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var child_process_1 = require('child_process');
var Handler_1 = require('./Handler');
var ExecHandler = (function (_super) {
    __extends(ExecHandler, _super);
    function ExecHandler() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ExecHandler.prototype, "moduleID", {
        get: function () { return 'exec'; },
        enumerable: true,
        configurable: true
    });
    ExecHandler.prototype.execute = function () {
        if (this.data.length === 0) {
            return;
        }
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var command = _a[_i];
            var spawnOptions = { detached: true, };
            if (!!command.cwd) {
                spawnOptions['cwd'] = command.cwd;
            }
            var child = child_process_1.spawn(command.command, command.args || [], spawnOptions);
            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        }
    };
    ExecHandler.prototype.render = function (item) {
        return item.command + " { args = " + item.args + " }";
    };
    return ExecHandler;
})(Handler_1.Handler);
exports.ExecHandler = ExecHandler;
//# sourceMappingURL=ExecHandler.js.map