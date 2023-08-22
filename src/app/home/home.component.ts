import { Component, OnInit } from '@angular/core';
import { Database, objectVal, ref, list, push, object } from '@angular/fire/database';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { Campaign } from '@app/@shared/models/campaign';
import { Character } from '@app/@shared/models/character';
import { CampaignService } from '@app/@shared/services/campaign.service';
import { CharacterService } from '@app/@shared/services/characters.service';
import { PasscodesService } from '@app/@shared/services/passcodes.service';
import { UserService } from '@app/@shared/services/user.service';
import { CredentialsService } from '@app/auth';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EMPTY, Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  isLoading = false;
  showUserData = false;
  showTodo = false;
  showHowoto = false;
  
  uid: string | undefined;
  userData: any;

  newCampaignName = '';
  newCampaignPasscode = '';
  campaignPasscode = '';

  charList: any[] = [];
  campaignList: any[] = [];
  dmCampaignList: any[] = [];

  constructor(private database: Database,
    private credentialsService: CredentialsService,
    private userService: UserService,
    private charService: CharacterService,
    private campaignService: CampaignService,
    private passcodeService: PasscodesService) {

    this.uid = this.credentialsService.credentials?.userId;
    console.log(this.uid);
  }

  ngOnInit() {
    this.userService.getJarvisUserSub().subscribe((v: any) => {
      this.userData = v;

      this.getCurrentCharsDetails();
      this.getCurrentCampaigns();
      this.getCurrentDmCampaigns();
    });
  }

  makeNewCampaignAsDM() {
    // const newCampaign = {
    //   name: this.newCampaignName,
    //   uid: '',
    //   characters: {},
    //   encounters: {}
    // }

    const newCampaign = new Campaign({ name: this.newCampaignName});

    this.campaignService.makeNewCampaignAsDm(newCampaign, this.newCampaignPasscode);
  }

  joinSomeCampaign() {
    this.passcodeService.getCampaignIdFromPasscodeSub(this.campaignPasscode).subscribe((cId: any) => {
      this.userService.joinCampaign(cId);
    });
  }

  getCurrentDmCampaigns() {
    this.dmCampaignList = [];

    Object.keys(this.userData.dmcampaigns).forEach((campKey: string) => {
      this.campaignService.getCampaignByIdSub(campKey).subscribe((v: any) => {
        
        if (!!v) {
          this.dmCampaignList.push(v);
        }

      });
    })
  }

  getCurrentCampaigns() {
    this.campaignList = [];

    Object.keys(this.userData.campaigns).forEach((campKey: string) => {
      this.campaignService.getCampaignByIdSub(campKey).subscribe((v: any) => {
        
        if (!!v) {
          this.campaignList.push(v);
        }

      });
    })
  }

  getCurrentCharsDetails() {
    this.charList = [];

    Object.keys(this.userData.characters).forEach((charKey: string) => {
      this.charService.getCharacterByIdSub(charKey).subscribe((v: any) => {
        
        if (!!v) {
          this.charList.push(v);
        }

      });
    })
  }

  deleteChar(charId: string) {
    this.charService.deleteCharacter(charId);
  }

    // testing
  pushOneCharToCurrentUser() {
    const newChar = new Character();
    newChar.name = 'test' + new Date().getTime();
    newChar.class = 'FIGHER';
    newChar.hpCurrent = 10;
    newChar.hpMax = 10;
    newChar.ac = 10;

    this.charService.addNewCharacter(newChar);
  }
}
