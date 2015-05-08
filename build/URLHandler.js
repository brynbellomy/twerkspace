var child_process_1 = require('child_process');
var URLHandler = (function () {
    function URLHandler() {
        this.urls = [];
    }
    Object.defineProperty(URLHandler.prototype, "moduleID", {
        get: function () { return 'url'; },
        enumerable: true,
        configurable: true
    });
    URLHandler.prototype.appendData = function (data) {
        if (!(data instanceof Array)) {
            throw new Error("URL data must be given as an array of strings containing the URLs to open.");
        }
        this.urls = this.urls.concat(data);
    };
    URLHandler.prototype.execute = function () {
        if (this.urls.length === 0) {
            return;
        }
        var spawnOptions = { detached: true, };
        var args = [].concat(this.CHROME_ARGS, this.urls);
        child_process_1.spawn(this.CHROME_EXECUTABLE, args, spawnOptions);
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
})();
exports.URLHandler = URLHandler;
//# sourceMappingURL=URLHandler.js.map