import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassePage } from './passe.page';

const routes: Routes = [
  {
    path: '',
    component: PassePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassePageRoutingModule {}
