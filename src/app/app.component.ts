import { Component } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'kotlinbarcamp';
  items: Observable<any[]>;
  user: Observable<firebase.User>;
  msgVal = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.items = af.list('/questions').valueChanges();

    this.user = this.afAuth.authState;

  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
      this.afAuth.auth.signOut();
  }

  Send(desc: string) {
      this.af.list('/questions').push({question: desc});
      this.msgVal = '';
  }


}
