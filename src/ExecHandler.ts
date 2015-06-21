
import {spawn} from 'child_process'
import {Handler, IDataItem, keyError} from './Handler'

export interface IExecData extends IDataItem {
    name: string;
    command: string;
    args?: string[];
    cwd?: string;
}

export class ExecHandler extends Handler<IExecData>
{
    get moduleID(): string { return 'exec' }

    execute(): void {
        if (this.data.length === 0) {
            return
        }

        for (const command of this.data) {
            let spawnOptions = { detached: true, }
            if (!!command.cwd) {
                spawnOptions['cwd'] = command.cwd
            }

            const child = spawn(command.command, command.args || [], spawnOptions)
            child.stdout.pipe(process.stdout)
            child.stderr.pipe(process.stderr)
        }
    }

    render (item: IExecData): string {
        return `${item.command} { args = ${item.args} }`
    }
}

