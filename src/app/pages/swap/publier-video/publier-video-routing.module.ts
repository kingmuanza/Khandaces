import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublierVideoPage } from './publier-video.page';

const routes: Routes = [
  {
    path: '',
    component: PublierVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublierVideoPageRoutingModule {}
