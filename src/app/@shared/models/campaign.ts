import { Generic } from "./_generic";

export class Campaign extends Generic {
    name: string | undefined;
    uid: string | undefined;
    characters: any | undefined;
    encounters: any | undefined;
}