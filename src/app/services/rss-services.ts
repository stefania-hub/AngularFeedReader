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

  constructor() {
    this.firestore.getUserFeeds().then(feeds => {

      this.getNews(feeds)

    });

  }
  getNews(feeds: Feed[]) {
    const requests = [];


    for (const feed of feeds) {
      const request = fetch(feed.url)
        .then(response => {
         const origin = feed.name;
         const xml = await response.text();
         return { xml, origin };
        })
        .catch(err => '');

      requests.push(request);
    }
    return Promise.all(requests).then(res => this.parseRss(res));
  }




  parseRss(responses: any[]): any {

    const latestNews: News[] = [];

    for (const response of responses) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.xml, "application/xml");

      const items = xmlDoc.getElementsByTagName("item");
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = item.getElementsByTagName("title")[0].textContent || '';
        const description = item.getElementsByTagName("description")[0].textContent || '';
        const url = item.getElementsByTagName("link")[0].textContent || '';
        const origin = 'unknown'

        const news: News = { title, description, url, origin }

        const stringDate = item.getElementsByTagName("pubDate")[0]?.textContent || '';
        if (stringDate) {
          news.pubDate = new Date(stringDate);
        }
       
        latestNews.push(news);
      }
    }
    latestNews.sort((a, b) => a.pubDate!.getTime() - b.pubDate!.getTime()!);

   
    this.news.set(latestNews);
  }
}
