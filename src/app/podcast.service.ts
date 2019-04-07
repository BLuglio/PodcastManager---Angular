import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  // GRAPHQL QUERIES
  RssQuery = gql`
    query Rss($url: String!) {
      rss(url: $url) {
        podcastTitle,
        podcastDescription,
        episodes {
          title
        }
      }
    }
  `;

  MultipleRssQuery = gql`
    query MultipleRss($urls: [String]!) {
      multipleRss(urls: $urls) {
        podcastTitle,
        podcastDescription
      }
    }
  `;
  
  private list = ["https://gearclubpodcast.libsyn.com/rss", "https://feeds.megaphone.fm/working-class-audio"];
  public notifyPodcasts = new BehaviorSubject<any>(undefined);

  constructor(private apollo: Apollo) { }

  retrievePodcasts(): any {
    this.apollo.watchQuery({
      query: this.MultipleRssQuery,
      variables: {
        urls: this.list
      }
    }).valueChanges.subscribe(data => {
      this.notifyPodcasts.next(data);
    })
    return this.notifyPodcasts
  }
}
