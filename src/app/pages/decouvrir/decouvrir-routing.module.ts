import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecouvrirPage } from './decouvrir.page';

const routes: Routes = [
  {
    path: '',
    component: DecouvrirPage
  },
  {
    path: 'decouvrir-videos',
    loadChildren: () => import('./decouvrir-videos/decouvrir-videos.module').then( (m) => m.DecouvrirVideosPageModule)
  },
  {
    path: 'decouvrir-utilisateurs',
    loadChildren: () => import('./decouvrir-utilisateurs/decouvrir-utilisateurs.module').then( (m) => m.DecouvrirUtilisateursPageModule)
  },
  {
    path: 'decouvrir-tags',
    loadChildren: () => import('./decouvrir-tags/decouvrir-tags.module').then( (m) => m.DecouvrirTagsPageModule)
  },
  {
    path: 'rechercher',
    loadChildren: () => import('./rechercher/rechercher.module').then( (m) => m.RechercherPageModule)
  },
  {
    path: 'voir-video/:id',
    loadChildren: () => import('./voir-video/voir-video.module').then( (m) => m.VoirVideoPageModule)
  },
  {
    path: 'voir-utilisateur/:id',
    loadChildren: () => import('./voir-utilisateur/voir-utilisateur.module').then( (m) => m.VoirUtilisateurPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecouvrirPageRoutingModule {}
