import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {  

  firebaseConfig = {

  apiKey: "AIzaSyD9VRtu9voOWEMA5aM3gpvrqxzfvwzRfNc",

  authDomain: "superfeed-d6d48.firebaseapp.com",

  projectId: "superfeed-d6d48",

  storageBucket: "superfeed-d6d48.firebasestorage.app",

  messagingSenderId: "88199694199",

  appId: "1:88199694199:web:aa0539efdf5da754c84372"

};

  app: FirebaseApp;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
  }
}
