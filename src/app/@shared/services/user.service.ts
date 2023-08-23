import { Injectable } from "@angular/core";
import { Database, DatabaseReference, object, push, ref, remove, set, update } from "@angular/fire/database";
import { CredentialsService } from "@app/auth";
import { JarvisUser } from "../models/user.model";

import { map, of } from "rxjs";
import { CampaignService } from "./campaign.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private static readonly USER_PATH = 'Users/';
    private static readonly CHARACTERS_SUBPATH = '/characters';
    private static readonly DM_CAMPAIGNS_SUBPATH = '/dmcampaigns';
    private static readonly CAMPAIGNS_SUBPATH = '/campaigns';

    uid: string | undefined;

    constructor(private database: Database, 
        private credentialsService: CredentialsService) {
            this.uid = this.credentialsService.credentials?.userId;
    }

    getDmStatusForCampaignSub(campaignId: string | null) {
        if (!campaignId) {
            return of(false);
        }

        const doc = ref(this.database, UserService.USER_PATH + this.uid + UserService.DM_CAMPAIGNS_SUBPATH + '/' + campaignId);

        return object(doc).pipe(
            map((v: any) => !!v)
        );
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

    addNewDMCampaignToUser(campaignId: string) {
        const doc = ref(this.database, UserService.USER_PATH + this.uid + UserService.DM_CAMPAIGNS_SUBPATH);

        update(doc, { [campaignId]: true });
    }

    joinCampaignPromise(campaignId: string) {
        const doc = ref(this.database, UserService.USER_PATH + this.uid + UserService.CAMPAIGNS_SUBPATH);

        // join campaign then add character to campaign
        return update(doc, { [campaignId]: true });
    }

    removeCharFromUser(charId: string) {
        const doc = ref(this.database, UserService.USER_PATH + this.uid + UserService.CHARACTERS_SUBPATH + '/' + charId);

        remove(doc);
    }

    removeCampaignFromUser(campId: string) {
        const doc = ref(this.database, UserService.USER_PATH + this.uid + UserService.CAMPAIGNS_SUBPATH + '/' + campId);

        remove(doc);
    }

}