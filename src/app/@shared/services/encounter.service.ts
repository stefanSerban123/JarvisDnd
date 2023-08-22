import { Injectable } from "@angular/core";
import { Database, object, push, ref } from "@angular/fire/database";
import { map } from "rxjs";
import { CampaignService } from "./campaign.service";
import { Encounter } from "../models/encounter";

@Injectable({
    providedIn: 'root'
})
export class EncounterService {
    private static readonly PATH = 'Encounters/';

    constructor(private database: Database,
        private campaignService: CampaignService) {
        // empty constructor
    }

    getEncounterByIdSub(id: string) {
        const doc = ref(this.database, EncounterService.PATH + id);
        
        return object(doc).pipe(map((v: any) =>
            v.snapshot.val()
        ));
    }

    createNewEncounter(campaignId: string) {
        this.campaignService.getCampaignByIdSub(campaignId).subscribe((c: any) => {
            c.characters;

            const newEnc = new Encounter({
                name: 'New Encounter',
                characters: c.characters,
                currentTurn: 0
            });

            const doc = ref(this.database, EncounterService.PATH);

            push(doc, newEnc).then(reference => {
                if (!!reference.key) {
                    this.campaignService.addNewEncounter(campaignId, reference.key);
                }
            });
        })
    }
}