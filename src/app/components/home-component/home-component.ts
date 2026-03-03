import { Component, effect, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore-service';
import { RssServices } from '../../services/rss-services';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
 rssServ= inject(RssServices)

 constructor() {
  effect(() => {
    this.rssServ.news()
  } )
 }

}
