import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonprofilCreationPage } from './monprofil-creation.page';

const routes: Routes = [
  {
    path: '',
    component: MonprofilCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonprofilCreationPageRoutingModule {}
