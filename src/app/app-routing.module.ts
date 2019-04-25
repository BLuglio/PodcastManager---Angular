import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastItemComponent } from './podcast-item/podcast-item.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/browse",
    pathMatch: "full"
  },
  {
    path: "browse",
    component: PodcastListComponent
  },
  {
    path: "browse/:id",
    component: PodcastItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//declare here all the components bound to the routes
export const routingComponents = [ PodcastListComponent, PodcastItemComponent ]
