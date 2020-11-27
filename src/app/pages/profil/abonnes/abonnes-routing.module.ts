import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbonnesPage } from './abonnes.page';

const routes: Routes = [
  {
    path: '',
    component: AbonnesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbonnesPageRoutingModule {}
