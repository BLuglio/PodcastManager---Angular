import { Component, OnInit } from '@angular/core';
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
  public episodesToShow = [];
  public cursor;
  public nextVisible: boolean;
  public previousVisible: boolean;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private podcastService: PodcastService) {}

  ngOnInit() {
    //take the podcast id from the path
    this.id = this.route.snapshot.paramMap.get('id');
    this.podcastService.loadPodcast(this.id).subscribe(data => {
        if(data){
          switch(data.msg){
            case("cache"):
              this.podcast = data.data;
              this.podcast.episodes = this.sanitizeContent(this.podcast.episodes);
              break;
            case("no-cache"):
              this.podcast = data.data.data.Rss;
              this.podcast.episodes = this.sanitizeContent(this.podcast.episodes);
              //sanitizing the image url
              for(let item of this.podcast) {
                item.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.imageUrl);
              }
              break;
          }
          this.cursor = 0;
          this.previousVisible = false;
          if(this.podcast.episodes.length > 10){
            this.nextVisible = true;
          }
          for(let i = 0; i < 10; i++){
            this.episodesToShow[i] = this.podcast.episodes[i];
          } 
        }
      })       
  }

  sanitizeContent(episodes) {
    for(let item of episodes) {
      item.content = this.sanitizer.bypassSecurityTrustResourceUrl(item.content);
      item.description = item.description.replace(/<\/?[^>]+(>|$)/g, "");
    }
    return episodes;
  }

  update(number){
    this.cursor = number;
    let tmp = [];
    for(let i = 0; i < 10; i++){
      if(this.podcast.episodes[(this.cursor * 10) + i]){
        tmp[i] = this.podcast.episodes[(this.cursor * 10) + i];
      }
    }
    if(this.cursor === Math.round(this.podcast.episodes.length/10)){
      this.nextVisible = false;
    }
    if(this.cursor === 0){
      this.previousVisible = false;
    }
    if(this.cursor > 0) {
      this.previousVisible = true;
    }
    if(this.cursor < Math.round(this.podcast.episodes.length/10)){
      this.nextVisible = true;
    }
    this.episodesToShow = tmp;
  }
}
