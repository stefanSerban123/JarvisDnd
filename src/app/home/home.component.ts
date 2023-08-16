import { Component, OnInit } from '@angular/core';
import { Database, objectVal, ref, list, push, object } from '@angular/fire/database';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { Character } from '@app/@shared/models/character';
import { CharacterService } from '@app/@shared/services/characters.service';
import { UserService } from '@app/@shared/services/user.service';
import { CredentialsService } from '@app/auth';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  isLoading = false;
  players: any;
  testObjectValue: Observable<any> = EMPTY;
  userData: any;

  uid: string | undefined;

  charList: any[] = [];

  constructor(private database: Database,
    private credentialsService: CredentialsService,
    private userService: UserService,
    private charService: CharacterService) {

    this.uid = this.credentialsService.credentials?.userId;
    console.log(this.uid);
  }

  ngOnInit() {
    this.userService.getJarvisUserSub().subscribe((v: any) => {
      this.userData = v;

      this.getCurrentCharsDetails();
    });
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
