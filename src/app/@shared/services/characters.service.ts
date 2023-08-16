import { Injectable } from "@angular/core";
import { Database, DatabaseReference, object, push, ref, remove, update } from "@angular/fire/database";
import { CredentialsService } from "@app/auth";
import { Character } from "../models/character";
import { UserService } from "./user.service";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private static readonly PATH = 'Characters/';

    constructor (private database: Database, private userService: UserService) {
        // empty constructor
    }

    getCharacterByIdSub(id: string) {
        const doc = ref(this.database, CharacterService.PATH + id);
        
        return object(doc).pipe(map((v: any) =>
            v.snapshot.val()
        ));
    } 

    addNewCharacter(char: Character) {
        const doc = ref(this.database, CharacterService.PATH);
        
        push(doc, char).then(reference => {
            if (!!reference.key) {
                // also add the uid to the char object for ease of use later on
                update(ref(this.database, CharacterService.PATH + '/' + reference.key), { uid: reference.key });

                this.userService.addCharacterToUser(reference.key);
            }
        });
    }

    deleteCharacter(charId: string) {
        this.userService.removeCharFromUser(charId);
        const doc = ref(this.database, CharacterService.PATH + charId);

        remove(doc);
    }
}