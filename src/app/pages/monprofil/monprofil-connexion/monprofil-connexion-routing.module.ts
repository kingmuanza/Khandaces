import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonprofilConnexionPage } from './monprofil-connexion.page';

const routes: Routes = [
  {
    path: '',
    component: MonprofilConnexionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonprofilConnexionPageRoutingModule {}
