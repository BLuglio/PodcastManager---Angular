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
        id,
        url,
        podcastTitle,
        podcastDescription,
        episodes {
          title,
          description,
          date,
          content
        }
      }
    }
  `;

  MultipleRssQuery = gql`
    query MultipleRss($urls: [String]!) {
      multipleRss(urls: $urls) {
        id,
        url,
        podcastTitle,
        podcastDescription,
        imageUrl,
        episodes {
          title,
          description,
          date,
          content
        }
      }
    }
  `;
  
  private list = ["https://gearclubpodcast.libsyn.com/rss", "https://feeds.megaphone.fm/working-class-audio"];
  public selectedUrl;
  public notifyPodcastList = new BehaviorSubject<any>(undefined);
  public notifyPodcastItem = new BehaviorSubject<any>(undefined);

  constructor(private apollo: Apollo) { }

  retrievePodcasts(): any {
    try {
      //loads info relative to a single podcast accessing the cache instead of calling the server   
      const data = this.apollo.getClient().readQuery({
        query: this.MultipleRssQuery,
        variables: {
          urls: this.list
        }
      });
      console.log('accessed cache');
      this.notifyPodcastList.next({msg: "cache", data: data});
    }catch(err) {
      //calls the server
      console.log('data not found in cache');
      this.apollo.watchQuery({
        query: this.MultipleRssQuery,
        variables: {
          urls: this.list
        }
      }).valueChanges.subscribe(data => {
        this.notifyPodcastList.next({msg: "no-cache", data: data});
      })
    }
    return this.notifyPodcastList;   
  }

  loadPodcast(id): any {
    try {
      //loads info relative to a single podcast accessing the cache instead of calling the server
      let cacheData = this.apollo.getClient().readQuery({
        query: this.MultipleRssQuery,
        variables: {
          urls: this.list
        }
      });
      console.log('accessed cache');
      let newData;
      for(let elem of cacheData.multipleRss){
        if(elem.id === id){
          newData = elem;
        }
      }
      this.notifyPodcastItem.next({msg: "cache", data: newData});
      return this.notifyPodcastItem;
    }catch(err) {
      //calls the server
      console.log("error " + err)
      this.apollo.watchQuery({
        query: this.RssQuery,
        variables: {
          url: this.selectedUrl
        }
      }).valueChanges.subscribe(data => {
        this.notifyPodcastItem.next({msg: "no-cache", data: data});
      })
      return this.notifyPodcastItem;
    } 
  }
}