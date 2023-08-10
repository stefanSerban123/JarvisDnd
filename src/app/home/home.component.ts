import { Component, OnInit } from '@angular/core';
import { Database, objectVal, ref, list, push } from '@angular/fire/database';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
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
  listValue: any[] = [];

  constructor(private dbfs: Firestore, private database: Database) { }

  ngOnInit() {
    this.isLoading = true;

    // TODO make services that make sense for database operations
    const doc = ref(this.database, 'Players');

    list(doc).subscribe((v: any) => {
      this.listValue = v.map((e: any) => e.snapshot)
    });

  }

  pushOne() {
    const doc = ref(this.database, 'Players');
    push(doc, { name: 'test44', class: 'test44' });
    // semi useful link: https://github.com/angular/angularfire/blob/master/site/src/rtdb/lists.md
    // also have set() and update() and remove()
  }
}
