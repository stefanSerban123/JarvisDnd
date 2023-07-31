import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection  } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  isLoading = false;
  players: any;

  constructor(private db: Firestore) {}

  ngOnInit() {
    this.isLoading = true;
    this.players = collection(this.db, 'Players');

    collectionData(this.players).subscribe((data) => {
      console.log(data);
    });
  }
}
