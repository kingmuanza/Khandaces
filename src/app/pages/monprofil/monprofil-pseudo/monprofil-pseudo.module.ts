import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonprofilPseudoPageRoutingModule } from './monprofil-pseudo-routing.module';

import { MonprofilPseudoPage } from './monprofil-pseudo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonprofilPseudoPageRoutingModule
  ],
  declarations: [MonprofilPseudoPage]
})
export class MonprofilPseudoPageModule {}
