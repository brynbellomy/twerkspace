
import {spawn} from 'child_process'
import {Handler, IDataItem} from './Handler'
import {nullish} from './helpers'

export interface IURLData extends IDataItem {
    url: string;
}


export class URLHandler extends Handler<IURLData>
{
    get moduleID(): string { return 'url' }

    execute(): void {
        if (this.data.length === 0) {
            return
        }

        let spawnOptions = { detached: true, }
        let args = [].concat(this.CHROME_ARGS, this.data)
        spawn(this.CHROME_EXECUTABLE, args, spawnOptions)
    }

    render (item: IURLData): string {
        return item.url
    }

    private get CHROME_EXECUTABLE(): string { return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }
    private get CHROME_ARGS(): string[]     { return ['--new-window'] }
}

