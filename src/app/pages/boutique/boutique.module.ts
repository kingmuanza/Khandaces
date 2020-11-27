import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoutiquePageRoutingModule } from './boutique-routing.module';

import { BoutiquePage } from './boutique.page';
import { ComposantsPageModule } from 'src/app/composants/composants.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComposantsPageModule,
    BoutiquePageRoutingModule
  ],
  declarations: [BoutiquePage]
})
export class BoutiquePageModule {}
