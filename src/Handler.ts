


export interface Handler {
    moduleID: string;
    appendData (data:any): void;
    execute(): void;
}
