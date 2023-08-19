import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '@app/@shared/services/campaign.service';

import { environment } from '@env/environment';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  cid: string | null = null;
  campaign: any = null;

  constructor(private route: ActivatedRoute, private campaignService: CampaignService) {}

  ngOnInit() {
    this.cid = this.route.snapshot.url[0].path;

    this.campaignService.getCampaignByIdSub(this.cid).subscribe((c: any) => {
      console.log(c);
      this.campaign = c;
    });
  }
}
