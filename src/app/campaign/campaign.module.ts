import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CampaignRoutingModule],
  declarations: [CampaignComponent],
})
export class CampaignModule {}
