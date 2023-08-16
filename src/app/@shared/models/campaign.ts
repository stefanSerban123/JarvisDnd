export class Campaign {
    name: string | undefined;
    uid: string | undefined;
    characters: any | undefined;

    constructor(src?: any) {
        if (!!src) {
            Object.assign(this, src);
        }
    }
}