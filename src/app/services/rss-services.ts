import { inject, Injectable, signal } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { FirestoreService } from './firestore-service';
import { NewFeedComponent } from '../components/new-feed-component/new-feed-component';
import { Feed } from '../model/feed';
import { News } from '../model/news';

@Injectable({
  providedIn: 'root',
})
export class RssServices {
 firestore = inject(FirestoreService);
 news = signal<News[]>([]);

 constructor(){
  this.firestore.getUserFeeds().then(feeds => {
    const firstFeed = feeds[0];
    this.getNews(firstFeed)
  
 });

  }
  getNews(firstFeed: Feed) {
  return fetch(firstFeed.url)
  .then(response => response.text())
  .then(text => this.parseRss(text))
  
  }

  parseRss(text: string): any{
    const latestNews: News[] = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");

    const items = xmlDoc.getElementsByTagName("item");
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const title = item.getElementsByTagName("title")[0].textContent || '';
      const description = item.getElementsByTagName("description")[0].textContent || '';
      const url = item.getElementsByTagName("link")[0].textContent || '';
      latestNews.push({ title, description, url });
    }
    this.news.set(latestNews);
 }

  }