var jsonSchema = require('json-schema');
var fs = require('fs');
function nullish(val) {
    return !(val !== null && val !== undefined);
}
exports.nullish = nullish;
function unimplementedError(unimplName) {
    return new Error("Subclasses must implement \"" + unimplName + "\".");
}
exports.unimplementedError = unimplementedError;
function createJsonSchemaValidator(schemaPath) {
    return function (obj) {
        var schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        return jsonSchema.validate(obj, schema);
    };
}
exports.createJsonSchemaValidator = createJsonSchemaValidator;
//# sourceMappingURL=helpers.js.map