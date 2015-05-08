
import {spawn} from 'child_process'
import {Handler} from './Handler'


export class URLHandler implements Handler
{
    urls: string[] = [];
    get moduleID(): string { return 'url' }

    constructor() {}

    appendData (data:any): void {
        if (!(data instanceof Array)) {
            throw new Error(`URL data must be given as an array of strings containing the URLs to open.`)
        }
        this.urls = this.urls.concat(data)
    }

    execute(): void {
        if (this.urls.length === 0) {
            return
        }

        let spawnOptions = { detached: true, }
        let args = [].concat(this.CHROME_ARGS, this.urls)
        spawn(this.CHROME_EXECUTABLE, args, spawnOptions)
    }

    private get CHROME_EXECUTABLE(): string { return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }
    private get CHROME_ARGS(): string[]     { return ['--new-window'] }
}

