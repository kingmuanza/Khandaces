import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecouvrirUtilisateursPage } from './decouvrir-utilisateurs.page';

const routes: Routes = [
  {
    path: '',
    component: DecouvrirUtilisateursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecouvrirUtilisateursPageRoutingModule {}
