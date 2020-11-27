import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonprofilPage } from './monprofil.page';

const routes: Routes = [
  {
    path: '',
    component: MonprofilPage
  },
  {
    path: 'edit',
    loadChildren: () => import('./monprofil-edit/monprofil-edit.module').then( (m) => m.MonprofilEditPageModule)
  },
  {
    path: 'passe',
    loadChildren: () => import('./passe/passe.module').then( (m) => m.PassePageModule)
  },
  {
    path: 'monprofil-creation',
    loadChildren: () => import('./monprofil-creation/monprofil-creation.module').then( (m) => m.MonprofilCreationPageModule)
  },
  {
    path: 'monprofil-pseudo',
    loadChildren: () => import('./monprofil-pseudo/monprofil-pseudo.module').then( (m) => m.MonprofilPseudoPageModule)
  },
  {
    path: 'monprofil-photo',
    loadChildren: () => import('./monprofil-photo/monprofil-photo.module').then( (m) => m.MonprofilPhotoPageModule)
  },
  {
    path: 'monprofil-connexion',
    loadChildren: () => import('./monprofil-connexion/monprofil-connexion.module').then( (m) => m.MonprofilConnexionPageModule)
  },
  {
    path: 'voir-video/:id',
    loadChildren: () => import('../decouvrir/voir-video/voir-video.module').then( (m) => m.VoirVideoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonprofilPageRoutingModule {}
