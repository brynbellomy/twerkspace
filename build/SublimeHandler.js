var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var path = require('path');
var fs = require('fs');
var child_process_1 = require('child_process');
var Handler_1 = require('./Handler');
var SublimeHandler = (function (_super) {
    __extends(SublimeHandler, _super);
    function SublimeHandler() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SublimeHandler.prototype, "moduleID", {
        get: function () { return 'subl'; },
        enumerable: true,
        configurable: true
    });
    SublimeHandler.prototype.validate = function (data) {
        _super.prototype.validate.call(this, data);
        data.path = data.path.replace(/^~/, process.env['HOME']);
        data.path = path.resolve(data.path);
        if (fs.existsSync(data.path) === false) {
            throw new Error("Path " + data.path + " does not exist.");
        }
    };
    SublimeHandler.prototype.render = function (item) {
        return item.path;
    };
    SublimeHandler.prototype.execute = function () {
        this.openProjects();
        this.openFiles();
    };
    SublimeHandler.prototype.openFiles = function () {
        var files = this.data.filter(function (file) { return path.extname(file.path) !== '.sublime-project'; })
            .map(function (file) { return file.path; });
        if (files.length === 0) {
            return;
        }
        var spawnOptions = { detached: true, };
        child_process_1.spawn(this.SUBL_EXECUTABLE, files, spawnOptions);
    };
    SublimeHandler.prototype.openProjects = function () {
        var projects = this.data.filter(function (file) { return path.extname(file.path) === '.sublime-project'; });
        if (projects.length === 0) {
            return;
        }
        for (var _i = 0; _i < projects.length; _i++) {
            var proj = projects[_i];
            var args = ['--project', proj.path];
            var spawnOptions = { detached: true, };
            child_process_1.spawn(this.SUBL_EXECUTABLE, args, spawnOptions);
        }
    };
    Object.defineProperty(SublimeHandler.prototype, "SUBL_EXECUTABLE", {
        get: function () { return '/Users/bryn/bin/subl'; },
        enumerable: true,
        configurable: true
    });
    return SublimeHandler;
})(Handler_1.Handler);
exports.SublimeHandler = SublimeHandler;
//# sourceMappingURL=SublimeHandler.js.map