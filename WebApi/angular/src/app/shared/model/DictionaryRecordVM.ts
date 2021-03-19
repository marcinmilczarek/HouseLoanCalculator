export interface IDictionaryRecordVM {
    Key: string;
    Value: number;
}

export class DictionaryRecordVM implements IDictionaryRecordVM {
    Key: string;
    Value: number;

    constructor(key?: string, value?: number) {
        this.Key = key;
        this.Value = value;
    }
}