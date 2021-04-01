export class InitResult {
    public readonly result: InitResultType;
    public readonly error: any;

    constructor(result: InitResultType, error: any = null) {
        this.result = result;
        this.error = error;
    }
}

export enum InitResultType {
    AlreadyExists = 1,
    Initialised = 2,
    Error = 3,
}
