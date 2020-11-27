import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonprofilEditPage } from './monprofil-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MonprofilEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonprofilEditPageRoutingModule {}
