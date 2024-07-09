import { Injectable } from "@angular/core";
import { Database, list, object, push, ref, update } from "@angular/fire/database";
import { UserService } from "./user.service";
import { map } from "rxjs";
import { Campaign } from "../models/campaign.model";
import { PasscodesService } from "./passcodes.service";

@Injectable({
    providedIn: 'root'
})
export class CampaignService {
    private static readonly PATH = 'campaigns/';
    private static readonly ENCOUNTERS_SUBPATH = '/encounters';
    private static readonly CHARACHTERS_SUBPATH = '/characters';

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

    makeNewCampaignAsDm(c: Campaign) {
        const doc = ref(this.database, CampaignService.PATH);

        push(doc, c).then(reference => {
            console.log(reference);
        });
        
        // .then(reference => {
        //     if (!!reference.key) {
        //         // also add the uid to the char object for ease of use later on
        //         update(ref(this.database, CampaignService.PATH + '/' + reference.key), { uid: reference.key });

        //         this.userService.addNewDMCampaignToUser(reference.key);
        //     }
        // });
    }

    addNewEncounter(campaignId: string, encounterId: string) {
        const doc = ref(this.database, CampaignService.PATH + campaignId + CampaignService.ENCOUNTERS_SUBPATH);

        update(doc, { [encounterId]: true });
    }

    joinCampaign(campaignId: string, characterId: string) {
        this.userService.joinCampaignPromise(campaignId).then(() => {
            this.addNewPlayerToCampaign(campaignId, characterId);
        });
    }

    addNewPlayerToCampaign(campaignId: string, characterId: string) {
        const doc = ref(this.database, CampaignService.PATH + campaignId + CampaignService.CHARACHTERS_SUBPATH);

        update(doc, { [characterId]: true });
    }
}