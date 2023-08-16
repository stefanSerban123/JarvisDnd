export class Character {
    name: string | undefined;
    class: string | undefined;
    hpMax: number | undefined;
    hpCurrent: number | undefined;
    ac: number | undefined;
    level = 1;
    uid: string | undefined; 
    // TO BE CONTINUED

    constructor (src?: any) {
        if (!!src) {
            Object.assign(this, src);
        }
    }
}