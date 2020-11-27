import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonprofilPhotoPage } from './monprofil-photo.page';

const routes: Routes = [
  {
    path: '',
    component: MonprofilPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonprofilPhotoPageRoutingModule {}
