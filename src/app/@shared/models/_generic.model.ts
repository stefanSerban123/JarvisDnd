export class Generic {
    constructor (src?: any) {
        if (!!src) {
            Object.assign(this, src);
        }
    }
}