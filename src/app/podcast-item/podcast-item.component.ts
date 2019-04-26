import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { PodcastService } from '../podcast.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-podcast-item',
  templateUrl: './podcast-item.component.html',
  styleUrls: ['./podcast-item.component.css']
})
export class PodcastItemComponent implements OnInit {

  public podcast;
  private id;
  public data;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private podcastService: PodcastService) { }

  ngOnInit() {
    //take the podcast id from the path
    this.id = this.route.snapshot.paramMap.get('id');
    this.podcastService.loadPodcast(this.id).subscribe(data => {
        if(data){
          switch(data.msg){
            case("cache"):
              this.podcast = data.data;
              break;
            case("no-cache"):
              this.podcast = data.data.data.Rss;
              //sanitizing the image url
              for(let item of this.podcast) {
                item.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.imageUrl);
              }
              break;
          }
        }
      })
      console.log(this.podcast);
  }

  showPlayer() {
    return this.podcast.content;
  }

}
