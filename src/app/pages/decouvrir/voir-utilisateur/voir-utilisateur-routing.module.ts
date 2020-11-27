import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoirUtilisateurPage } from './voir-utilisateur.page';

const routes: Routes = [
  {
    path: '',
    component: VoirUtilisateurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoirUtilisateurPageRoutingModule {}
