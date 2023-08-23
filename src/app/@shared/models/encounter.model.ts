import { Character } from "./character.model";
import { Generic } from "./_generic.model";

export class Encounter extends Generic {
    name: string | undefined;
    currentTurn: number | undefined;
    mobs: Character[] | undefined;
}