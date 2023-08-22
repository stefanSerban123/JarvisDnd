import { Character } from "./character";
import { Generic } from "./_generic";

export class Encounter extends Generic {
    name: string | undefined;
    currentTurn: number | undefined;
    mobs: Character[] | undefined;
}