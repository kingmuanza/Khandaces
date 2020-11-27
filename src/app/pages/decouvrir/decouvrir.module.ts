import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecouvrirPageRoutingModule } from './decouvrir-routing.module';

import { DecouvrirPage } from './decouvrir.page';
import { ComposantsPageModule } from 'src/app/composants/composants.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComposantsPageModule,
    DecouvrirPageRoutingModule
  ],
  declarations: [DecouvrirPage]
})
export class DecouvrirPageModule {}
