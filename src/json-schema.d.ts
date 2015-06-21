

declare module "json-schema" {
    export = JSONSchemaModule;

    module JSONSchemaModule {
        export function validate(instance: any, schema: {}): IValidationResult;

        interface IValidationResult {
            valid: boolean;
            errors: any[];
        }
    }
}