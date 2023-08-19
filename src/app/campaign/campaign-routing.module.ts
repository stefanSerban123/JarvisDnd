import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { CampaignComponent } from './campaign.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '**', component: CampaignComponent, data: { title: marker('Campaign') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CampaignRoutingModule {}
