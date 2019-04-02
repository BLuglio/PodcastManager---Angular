import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PodcastListComponent } from './podcast-list/podcast-list.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: PodcastListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
