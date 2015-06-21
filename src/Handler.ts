
import * as assert from 'assert'
import * as util from 'util'
import * as path from 'path'
import {nullish, unimplementedError, createJsonSchemaValidator} from './helpers'


export interface IDataItem {
    name: string;
}

export interface IRenderedData {
    [name: string]: string;
}

export function keyError (key: string, type: string, data: IDataItem): Error {
    return new Error(`Item did not pass validation: "${key}" key is missing or incorrect type (should be of type "${type}") -> ${JSON.stringify(data) }`)
}

export class Handler <Data extends IDataItem>
{
    data: Data[] = [];

    get moduleID(): string { throw unimplementedError('get moduleID(): string') }

    constructor() {
        // no-op.
    }

    validate (data: Data): void {
        const validator = createJsonSchemaValidator(path.join(__dirname, `./${this.moduleID}.schema.json`))
        const result    = validator(data)
        if (!result.valid) {
            throw new Error(util.inspect({ message: `Invalid data for ${this.moduleID} plugin`, errors: result.errors }))
        }
    }

    appendData (newData: Data|Data[]): void {
        if (newData instanceof Array) {
            newData.forEach((item) => this.appendData(item))
        }
        else {
            this.validate(<Data>newData)
            this.data.push(<Data>newData)
        }
    }

    execute(): void {
        throw unimplementedError('execute(): void')
    }

    render (item: Data): string {
        return util.inspect(item)
    }

    list(): IRenderedData {
        return <IRenderedData> this.data.reduce((into, each) => {
            into[each.name] = this.render(each)
            return into
        }, {})
    }
}
