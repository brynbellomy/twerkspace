var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var URLHandler_1 = require('./URLHandler');
var ExecHandler_1 = require('./ExecHandler');
var SublimeHandler_1 = require('./SublimeHandler');
var HANDLERS = [new ExecHandler_1.ExecHandler(), new URLHandler_1.URLHandler(), new SublimeHandler_1.SublimeHandler(),];
function loadWorkspace(filename) {
    var workspace = readWorkspaceConfig(filename);
    // go through the provided file and, for each module/handler specified, give that module its unaltered data from the file
    for (var _i = 0; _i < HANDLERS.length; _i++) {
        var handler = HANDLERS[_i];
        var moduleID = handler.moduleID;
        if (nonNull(workspace.modules[moduleID])) {
            var moduleData = workspace.modules[moduleID];
            handler.appendData(moduleData);
        }
    }
    for (var _a = 0; _a < HANDLERS.length; _a++) {
        var handler_1 = HANDLERS[_a];
        handler_1.execute();
    }
}
exports.loadWorkspace = loadWorkspace;
function readWorkspaceConfig(filename) {
    if (!fs.existsSync(filename)) {
        throw new Error(filename + " does not exist.");
    }
    var contents = fs.readFileSync(filename, 'utf8');
    switch (path.extname(filename).toLowerCase()) {
        case '.json': return JSON.parse(contents);
        case '.yaml': return yaml.load(contents);
        default: throw new Error('The specified file must be either a JSON or YAML file, and must end in either ".json" or ".yaml".');
    }
}
function nonNull(val) {
    return val !== null && val !== undefined;
}
//# sourceMappingURL=index.js.map