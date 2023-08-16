import { Injectable } from "@angular/core";
import { Database, object, push, ref, set } from "@angular/fire/database";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PasscodesService {
    private static readonly PATH = 'Passcodes/';

    constructor(private database: Database) {
        // empty constructor
    }

    getCampaignIdFromPasscodeSub(passcode: string) {
        const doc = ref(this.database, PasscodesService.PATH + passcode);

        return object(doc).pipe(map((v: any) =>
            v.snapshot.val()
        ));
    }

    addNewPasscode(passcode: string, campaignId: string) {
        const doc = ref(this.database, PasscodesService.PATH);

        set(doc, { [passcode]: campaignId });
    }
}