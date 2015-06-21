var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var child_process_1 = require('child_process');
var Handler_1 = require('./Handler');
var URLHandler = (function (_super) {
    __extends(URLHandler, _super);
    function URLHandler() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(URLHandler.prototype, "moduleID", {
        get: function () { return 'url'; },
        enumerable: true,
        configurable: true
    });
    URLHandler.prototype.execute = function () {
        if (this.data.length === 0) {
            return;
        }
        var spawnOptions = { detached: true, };
        var args = [].concat(this.CHROME_ARGS, this.data);
        child_process_1.spawn(this.CHROME_EXECUTABLE, args, spawnOptions);
    };
    URLHandler.prototype.render = function (item) {
        return item.url;
    };
    Object.defineProperty(URLHandler.prototype, "CHROME_EXECUTABLE", {
        get: function () { return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLHandler.prototype, "CHROME_ARGS", {
        get: function () { return ['--new-window']; },
        enumerable: true,
        configurable: true
    });
    return URLHandler;
})(Handler_1.Handler);
exports.URLHandler = URLHandler;
//# sourceMappingURL=URLHandler.js.map