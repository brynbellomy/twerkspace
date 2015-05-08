
import {spawn} from 'child_process'
import {Handler} from './Handler'


export class ExecOptions
{
    command: string;
    args: string[];
    cwd: string;

    constructor(obj:any)
    {
        if (typeof obj['command'] !== 'string') {
            throw new Error(`'exec' plugin is misconfigured.  Each exec item in your workspace must have, at the very least, a 'command' key containing the command to run (as a simple string).`)
        }
        this.command = obj['command']
        this.args = obj['args'] || []
        this.cwd = obj['cwd'] || null
    }
}


export class ExecHandler implements Handler
{
    commands: ExecOptions[] = [];
    get moduleID(): string { return 'exec' }

    constructor() {}

    appendData (data:any): void
    {
        if (!(data instanceof Array)) {
            throw new Error(`Exec data must be given as an array of objects implementing the ExecOptions interface.`)
        }

        let newCommands = (<any[]>data).map((row) => new ExecOptions(row))
        this.commands = this.commands.concat(newCommands)
    }

    execute(): void
    {
        if (this.commands.length === 0) {
            return
        }

        for (let command of this.commands) {
            let spawnOptions = { detached: true, }
            if (!!command.cwd) {
                spawnOptions['cwd'] = command.cwd
            }

            let child = spawn(command.command, command.args || [], spawnOptions)
            child.stdout.pipe(process.stdout)
            child.stderr.pipe(process.stderr)
        }
    }
}

