import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbonnementsPage } from './abonnements.page';

const routes: Routes = [
  {
    path: '',
    component: AbonnementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbonnementsPageRoutingModule {}
