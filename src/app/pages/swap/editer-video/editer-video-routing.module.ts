import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditerVideoPage } from './editer-video.page';

const routes: Routes = [
  {
    path: '',
    component: EditerVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditerVideoPageRoutingModule {}
