import { Generic } from "./_generic";

export class Character extends Generic {
    name: string | undefined;
    class: string | undefined;
    hpMax: number | undefined;
    hpCurrent: number | undefined;
    ac: number | undefined;
    level = 1;
    uid: string | undefined; 
    order: number | undefined;
    // TO BE CONTINUED
}