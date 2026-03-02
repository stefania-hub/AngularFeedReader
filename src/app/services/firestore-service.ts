import { inject, Injectable } from '@angular/core';
import { Feed } from '../model/feed';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore/lite';
import { FirebaseService } from './firebase-service';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  authServ = inject(AuthService);
  firebase = inject(FirebaseService);
  db = getFirestore(this.firebase.app);

  userFeeds: Feed[] = [];

  addFeed(newFeed: Feed) {
    if (this.authServ.auth.currentUser) {
      this.userFeeds.push(newFeed);
      const userRef = doc(this.db, 'users', this.authServ.auth.currentUser.uid);
     return  setDoc(userRef, { feeds: this.userFeeds}, { merge: true });
    }

    return Promise.reject('User not authenticated');
  }


  getUserFeeds() {
    console.log(this.authServ.auth.currentUser);
   if (this.authServ.auth.currentUser) {
    const UserRef = doc(this.db, 'users', this.authServ.auth.currentUser.uid);
    return getDoc(UserRef).then(result => {
      // console.log(result.data());
      this.userFeeds = result.data()!['feeds'] || [];
      return this.userFeeds;
    })
   }
   return Promise.reject('User not authenticated');
  }


}
