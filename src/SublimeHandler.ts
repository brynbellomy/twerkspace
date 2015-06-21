
import * as path from 'path'
import * as fs from 'fs'
import {spawn} from 'child_process'
import {Handler, IDataItem} from './Handler'
import {nullish} from './helpers'


export interface ISublimeData extends IDataItem {
    path: string;
}

export class SublimeHandler extends Handler<ISublimeData>
{
    get moduleID(): string { return 'subl' }

    validate (data: ISublimeData): void {
        super.validate(data)
        data.path = data.path.replace(/^~/, process.env['HOME'])
        data.path = path.resolve(data.path)
        if (fs.existsSync(data.path) === false) {
            throw new Error(`Path ${data.path} does not exist.`)
        }
    }

    render (item: ISublimeData): string {
        return item.path
    }

    execute(): void {
        this.openProjects()
        this.openFiles()
    }

    openFiles(): void {
        const files = this.data.filter((file) => path.extname(file.path) !== '.sublime-project')
                               .map((file) => file.path)

        if (files.length === 0) {
            return
        }

        const spawnOptions = { detached: true, }
        spawn(this.SUBL_EXECUTABLE, files, spawnOptions)
    }

    openProjects(): void {
        const projects = this.data.filter((file) => path.extname(file.path) === '.sublime-project')
        if (projects.length === 0) {
            return
        }

        for (const proj of projects) {
            const args = ['--project', proj.path]
            const spawnOptions = { detached: true, }
            spawn(this.SUBL_EXECUTABLE, args, spawnOptions)
        }
    }

    private get SUBL_EXECUTABLE(): string { return '/Users/bryn/bin/subl' }
}

