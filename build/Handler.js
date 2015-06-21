var util = require('util');
var path = require('path');
var helpers_1 = require('./helpers');
function keyError(key, type, data) {
    return new Error("Item did not pass validation: \"" + key + "\" key is missing or incorrect type (should be of type \"" + type + "\") -> " + JSON.stringify(data));
}
exports.keyError = keyError;
var Handler = (function () {
    function Handler() {
        this.data = [];
        // no-op.
    }
    Object.defineProperty(Handler.prototype, "moduleID", {
        get: function () { throw helpers_1.unimplementedError('get moduleID(): string'); },
        enumerable: true,
        configurable: true
    });
    Handler.prototype.validate = function (data) {
        var validator = helpers_1.createJsonSchemaValidator(path.join(__dirname, "./" + this.moduleID + ".schema.json"));
        var result = validator(data);
        if (!result.valid) {
            throw new Error(util.inspect({ message: "Invalid data for " + this.moduleID + " plugin", errors: result.errors }));
        }
    };
    Handler.prototype.appendData = function (newData) {
        var _this = this;
        if (newData instanceof Array) {
            newData.forEach(function (item) { return _this.appendData(item); });
        }
        else {
            this.validate(newData);
            this.data.push(newData);
        }
    };
    Handler.prototype.execute = function () {
        throw helpers_1.unimplementedError('execute(): void');
    };
    Handler.prototype.render = function (item) {
        return util.inspect(item);
    };
    Handler.prototype.list = function () {
        var _this = this;
        return this.data.reduce(function (into, each) {
            into[each.name] = _this.render(each);
            return into;
        }, {});
    };
    return Handler;
})();
exports.Handler = Handler;
//# sourceMappingURL=Handler.js.map