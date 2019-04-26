import { Component, OnInit, OnDestroy } from '@angular/core';
import { PodcastService } from '../podcast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.css']
})
export class PodcastListComponent implements OnInit {

  //the list of all podcasts subscribed by the user
  public podcasts: any = [];

  constructor(private sanitizer: DomSanitizer, private podcastService: PodcastService, private router: Router) { }

  ngOnInit() {
    this.podcastService.retrievePodcasts().subscribe(data => {
      if(data){
        switch(data.msg){
          case("cache"):
            this.podcasts = data.data.multipleRss;
            break;
          case("no-cache"):
            this.podcasts = data.data.data.multipleRss;
            //sanitizing the image url
            for(let item of this.podcasts) {
              item.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.imageUrl);
            }
            break;
        }
      }
    })
  }

  //shows the page relative to the selected podcast
  onSelect(podcast: any) {
    this.podcastService.selectedUrl = podcast.url;
    this.router.navigate(['/browse', podcast.id]);
  }

}
