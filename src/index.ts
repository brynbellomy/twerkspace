
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import * as path from 'path'
import {Handler} from './Handler'
import {URLHandler} from './URLHandler'
import {ExecHandler} from './ExecHandler'
import {SublimeHandler} from './SublimeHandler'


let HANDLERS: Handler[] = [ new ExecHandler(), new URLHandler(), new SublimeHandler(), ]


export function loadWorkspace (filename:string): void
{
    let workspace = readWorkspaceConfig(filename)

    // go through the provided file and, for each module/handler specified, give that module its unaltered data from the file
    for (var handler of HANDLERS) {
        let moduleID = handler.moduleID
        if (nonNull(workspace.modules[ moduleID ])) {
            let moduleData = workspace.modules[ moduleID ]
            handler.appendData(moduleData)
        }
    }

    for (let handler of HANDLERS) {
        handler.execute()
    }
}


function readWorkspaceConfig (filename:string): ConfigFile
{
    if (!fs.existsSync(filename)) {
        throw new Error(`${filename} does not exist.`)
    }

    let contents = fs.readFileSync(filename, 'utf8')

    switch (path.extname(filename).toLowerCase()) {
        case '.json': return <ConfigFile> JSON.parse(contents)
        case '.yaml': return <ConfigFile> yaml.load(contents)
        default:      throw new Error('The specified file must be either a JSON or YAML file, and must end in either ".json" or ".yaml".')
    }
}


export interface ConfigFile {
    inherits?: string[];
    modules:   ConfigFileModulesSection;
}

export interface ConfigFileModulesSection {
    [name: string]: any;
}



function nonNull (val) {
    return val !== null && val !== undefined
}


