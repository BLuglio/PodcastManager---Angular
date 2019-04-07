import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../podcast.service';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.css']
})
export class PodcastListComponent implements OnInit {

  public podcasts: any = [];
  public title: string;
  public podcastDescription: string;

  constructor(private podcastService: PodcastService) { }

  ngOnInit() {
    this.podcastService.retrievePodcasts().subscribe(data => {
      if(data){
        this.podcasts = data.data.multipleRss;
        console.log(this.podcasts)
      //this.podcastDescription = data.data.rss.podcastDescription;
      //this.title = data.data.rss.podcastTitle;
    }
    })

  }

}
