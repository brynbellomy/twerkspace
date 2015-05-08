
import * as path from 'path'
import {spawn} from 'child_process'
import {Handler} from './Handler'


export class SublimeHandler implements Handler
{
    files: string[] = [];
    get moduleID(): string { return 'subl' }

    constructor() {}

    appendData (data:any): void {
        if (!(data instanceof Array)) {
            throw new Error(`Sublime files must be given as an array of strings containing the files to open.`)
        }
        this.files = this.files.concat(data)
    }

    execute(): void {
        this.openProjects()
        this.openFiles()
    }

    openFiles(): void {
        let files = this.files.filter((file) => path.extname(file) !== '.sublime-project')
        if (files.length === 0) {
            return
        }

        let spawnOptions = { detached: true, }
        spawn(this.SUBL_EXECUTABLE, files, spawnOptions)
    }

    openProjects(): void {
        let projects = this.files.filter((file) => path.extname(file) === '.sublime-project')
        if (projects.length === 0) {
            return
        }

        for (let proj of projects) {
            let args = ['--project', proj]
            let spawnOptions = { detached: true, }
            spawn(this.SUBL_EXECUTABLE, args, spawnOptions)
        }
    }

    private get SUBL_EXECUTABLE(): string { return '/Users/bryn/bin/subl' }
}

