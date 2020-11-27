import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecouvrirTagsPage } from './decouvrir-tags.page';

const routes: Routes = [
  {
    path: '',
    component: DecouvrirTagsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecouvrirTagsPageRoutingModule {}
