import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecouvrirTagsPageRoutingModule } from './decouvrir-tags-routing.module';

import { DecouvrirTagsPage } from './decouvrir-tags.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecouvrirTagsPageRoutingModule
  ],
  declarations: [DecouvrirTagsPage]
})
export class DecouvrirTagsPageModule {}
