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

  public notifyPodcasts = new BehaviorSubject<any>(undefined);

  constructor(private apollo: Apollo) { }

  retrievePodcasts(): any {
    const url = "http://feeds.megaphone.fm/working-class-audio";
    this.apollo.query({
      query: this.RssQuery,
      variables: {
        url: url
      }
    }).subscribe(data => {
      this.notifyPodcasts.next(data);
    })
    return this.notifyPodcasts
  }
}
