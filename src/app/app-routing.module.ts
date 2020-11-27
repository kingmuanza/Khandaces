import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./pages/connexion/connexion.module').then((m) => m.ConnexionPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./pages/inscription/inscription.module').then((m) => m.InscriptionPageModule)
  },
  {
    path: 'monprofil',
    loadChildren: () => import('./pages/monprofil/monprofil.module').then((m) => m.MonprofilPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
