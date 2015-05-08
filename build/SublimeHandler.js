var path = require('path');
var child_process_1 = require('child_process');
var SublimeHandler = (function () {
    function SublimeHandler() {
        this.files = [];
    }
    Object.defineProperty(SublimeHandler.prototype, "moduleID", {
        get: function () { return 'subl'; },
        enumerable: true,
        configurable: true
    });
    SublimeHandler.prototype.appendData = function (data) {
        if (!(data instanceof Array)) {
            throw new Error("Sublime files must be given as an array of strings containing the files to open.");
        }
        this.files = this.files.concat(data);
    };
    SublimeHandler.prototype.execute = function () {
        this.openProjects();
        this.openFiles();
    };
    SublimeHandler.prototype.openFiles = function () {
        var files = this.files.filter(function (file) { return path.extname(file) !== '.sublime-project'; });
        if (files.length === 0) {
            return;
        }
        var spawnOptions = { detached: true, };
        child_process_1.spawn(this.SUBL_EXECUTABLE, files, spawnOptions);
    };
    SublimeHandler.prototype.openProjects = function () {
        var projects = this.files.filter(function (file) { return path.extname(file) === '.sublime-project'; });
        if (projects.length === 0) {
            return;
        }
        for (var _i = 0; _i < projects.length; _i++) {
            var proj = projects[_i];
            var args = ['--project', proj];
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
})();
exports.SublimeHandler = SublimeHandler;
//# sourceMappingURL=SublimeHandler.js.map