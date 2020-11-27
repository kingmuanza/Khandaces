import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecouvrirVideosPage } from './decouvrir-videos.page';

const routes: Routes = [
  {
    path: '',
    component: DecouvrirVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecouvrirVideosPageRoutingModule {}
