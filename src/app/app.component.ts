import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    const Rss = gql`
      query Rss($url: String!) {
        rss(url: $url) {
          podcastTitle,
            podcastDescription,
            episodes {
              title
            }
          }
        }`;

    const url = "http://feeds.megaphone.fm/working-class-audio";
    this.apollo.query({
      query: Rss,
      variables: {
        url: url
      }
    }).subscribe(data => {
      console.log(data);
    })
  }
}
