import { Injectable } from "@angular/core";
import { Database, DatabaseReference, object, push, ref, remove, set, update } from "@angular/fire/database";
import { CredentialsService } from "@app/auth";
import { JarvisUser } from "../models/user";

import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private static readonly USER_PATH = 'Users/';
    private static readonly CHARACTERS_SUBPATH = '/characters';
    uid: string | undefined;

    constructor(private database: Database, private credentialsService: CredentialsService) {
        this.uid = this.credentialsService.credentials?.userId;
    }

    getJarvisUserSub() {
        // should only be able to see your own user data
        const doc = ref(this.database, UserService.USER_PATH + this.uid);

        return object(doc).pipe(
            map((v: any) => v.snapshot.val())
        );
    }

    addCharacterToUser(charId: string) {
        const doc = ref(this.database, UserService.USER_PATH + this.uid + UserService.CHARACTERS_SUBPATH);

        update(doc, { [charId]: true });
    }

    removeCharFromUser(charId: string) {
        const doc = ref(this.database, UserService.USER_PATH + this.uid + UserService.CHARACTERS_SUBPATH + '/' + charId);

        remove(doc);
    }

}