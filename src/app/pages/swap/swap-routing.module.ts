import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwapPage } from './swap.page';

const routes: Routes = [
  {
    path: '',
    component: SwapPage
  },
  {
    path: 'connexion',
    loadChildren: () => import('../../pages/connexion/connexion.module').then((m) => m.ConnexionPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('../../pages/inscription/inscription.module').then((m) => m.InscriptionPageModule)
  },
  {
    path: 'publier-video/:id',
    loadChildren: () => import('./publier-video/publier-video.module').then( (m) => m.PublierVideoPageModule)
  },
  {
    path: 'editer-video',
    loadChildren: () => import('./editer-video/editer-video.module').then( m => m.EditerVideoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwapPageRoutingModule {}
