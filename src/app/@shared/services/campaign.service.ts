import { Injectable } from "@angular/core";
import { Database, object, push, ref, update } from "@angular/fire/database";
import { UserService } from "./user.service";
import { map } from "rxjs";
import { Campaign } from "../models/campaign";
import { PasscodesService } from "./passcodes.service";

@Injectable({
    providedIn: 'root'
})
export class CampaignService {
    private static readonly PATH = 'Campaigns/';

    constructor(private database: Database, 
        private userService: UserService,
        private passcodeService: PasscodesService) {
        // empty constructor
    }

    getCampaignByIdSub(id: string) {
        const doc = ref(this.database, CampaignService.PATH + id);
        
        return object(doc).pipe(map((v: any) =>
            v.snapshot.val()
        ));
    }

    makeNewCampaignAsDm(c: Campaign, passcode: string) {
        const doc = ref(this.database, CampaignService.PATH);

        push(doc, c).then(reference => {
            if (!!reference.key) {
                // also add the uid to the char object for ease of use later on
                update(ref(this.database, CampaignService.PATH + '/' + reference.key), { uid: reference.key });

                this.userService.addNewDMCampaignToUser(reference.key);
                this.passcodeService.addNewPasscode(passcode, reference.key);
            }
        });
    }
}