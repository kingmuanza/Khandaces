import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilPage } from './accueil.page';

const routes: Routes = [
  {
    path: '',
    component: AccueilPage
  },
  {
    path: 'profil/:id',
    loadChildren: () => import('../profil/profil.module').then( (m) => m.ProfilPageModule)
  },
  {
    path: 'profil/view/:id',
    loadChildren: () => import('../profil/profil.module').then( (m) => m.ProfilPageModule)
  },
  {
    path: 'abonnements/:id',
    loadChildren: () => import('../profil/abonnements/abonnements.module').then( (m) => m.AbonnementsPageModule)
  },
  {
    path: 'abonnements/:id/:abo',
    loadChildren: () => import('../profil/abonnements/abonnements.module').then( (m) => m.AbonnementsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccueilPageRoutingModule {}
