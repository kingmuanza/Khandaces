import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilPage } from './profil.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilPage
  },
  {
    path: '/:id',
    component: ProfilPage
  },
  {
    path: 'abonnements/:id',
    loadChildren: () => import('./abonnements/abonnements.module').then( (m) => m.AbonnementsPageModule)
  },
  {
    path: 'abonnements',
    loadChildren: () => import('./abonnements/abonnements.module').then( (m) => m.AbonnementsPageModule)
  },
  {
    path: 'abonnes',
    loadChildren: () => import('./abonnes/abonnes.module').then( (m) => m.AbonnesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilPageRoutingModule {}
