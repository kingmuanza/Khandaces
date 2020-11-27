import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'accueil',
        loadChildren: () => import('../pages/accueil/accueil.module').then((m) => m.AccueilPageModule)
      },
      {
        path: 'decouvrir',
        loadChildren: () => import('../pages/decouvrir/decouvrir.module').then((m) => m.DecouvrirPageModule)
      },
      {
        path: 'swap',
        loadChildren: () => import('../pages/swap/swap.module').then((m) => m.SwapPageModule)
      },
      {
        path: 'boutique',
        loadChildren: () => import('../pages/boutique/boutique.module').then((m) => m.BoutiquePageModule)
      },
      {
        path: 'messagerie',
        loadChildren: () => import('../pages/messagerie/messagerie.module').then((m) => m.MessageriePageModule)
      },
      {
        path: 'monprofil',
        loadChildren: () => import('../pages/monprofil/monprofil.module').then((m) => m.MonprofilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/accueil',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
