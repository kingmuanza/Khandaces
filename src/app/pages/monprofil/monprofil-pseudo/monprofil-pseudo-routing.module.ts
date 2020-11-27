import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonprofilPseudoPage } from './monprofil-pseudo.page';

const routes: Routes = [
  {
    path: '',
    component: MonprofilPseudoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonprofilPseudoPageRoutingModule {}
