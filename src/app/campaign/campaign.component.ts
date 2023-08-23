import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '@app/@shared/services/campaign.service';
import { CharacterService } from '@app/@shared/services/characters.service';
import { UserService } from '@app/@shared/services/user.service';

import { environment } from '@env/environment';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  cid: string | null = null;
  campaign: any = null;
  isDm = false;

  characters: any[] = [];
  encounters: any[] = [];

  constructor(private route: ActivatedRoute, 
    private campaignService: CampaignService,
    private userService: UserService,
    private characterService: CharacterService) {}

  ngOnInit() {
    this.cid = this.route.snapshot.url[0].path;

    if (!this.cid) {
      return;
    }

    // get campaign then check for DM status
    this.campaignService.getCampaignByIdSub(this.cid).subscribe((c: any) => {
      console.log(c);
      this.campaign = c;
      this.encounters = c.encounters;

      this.userService.getDmStatusForCampaignSub(this.cid).subscribe((isDm: any) => {
        this.isDm = isDm;

        this.getPlayersForCampaign();
      });
    });
  }
  
  getPlayersForCampaign() {
    Object.keys(this.campaign.characters).forEach(character => {
      this.characterService.getCharacterByIdSub(character).subscribe((c: any) => {
        this.characters.push(c);
      });
    })
  }

}
