
import * as jsonSchema from 'json-schema'
import * as fs from 'fs'


export function nullish (val: any): boolean {
    return !(val !== null && val !== undefined)
}

export function unimplementedError (unimplName: string): Error {
    return new Error(`Subclasses must implement "${unimplName}".`)
}

export function createJsonSchemaValidator (schemaPath: string): (obj: any) => jsonSchema.IValidationResult {
    return function (obj: any) {
        const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        return jsonSchema.validate(obj, schema)
    }
}