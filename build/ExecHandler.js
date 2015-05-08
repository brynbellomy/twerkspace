var child_process_1 = require('child_process');
var ExecOptions = (function () {
    function ExecOptions(obj) {
        if (typeof obj['command'] !== 'string') {
            throw new Error("'exec' plugin is misconfigured.  Each exec item in your workspace must have, at the very least, a 'command' key containing the command to run (as a simple string).");
        }
        this.command = obj['command'];
        this.args = obj['args'] || [];
        this.cwd = obj['cwd'] || null;
    }
    return ExecOptions;
})();
exports.ExecOptions = ExecOptions;
var ExecHandler = (function () {
    function ExecHandler() {
        this.commands = [];
    }
    Object.defineProperty(ExecHandler.prototype, "moduleID", {
        get: function () { return 'exec'; },
        enumerable: true,
        configurable: true
    });
    ExecHandler.prototype.appendData = function (data) {
        if (!(data instanceof Array)) {
            throw new Error("Exec data must be given as an array of objects implementing the ExecOptions interface.");
        }
        var newCommands = data.map(function (row) { return new ExecOptions(row); });
        this.commands = this.commands.concat(newCommands);
    };
    ExecHandler.prototype.execute = function () {
        if (this.commands.length === 0) {
            return;
        }
        for (var _i = 0, _a = this.commands; _i < _a.length; _i++) {
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
    return ExecHandler;
})();
exports.ExecHandler = ExecHandler;
//# sourceMappingURL=ExecHandler.js.map