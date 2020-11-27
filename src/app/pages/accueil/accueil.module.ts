import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccueilPageRoutingModule } from './accueil-routing.module';

import { AccueilPage } from './accueil.page';
import { ComposantsPageModule } from 'src/app/composants/composants.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComposantsPageModule,
    AccueilPageRoutingModule
  ],
  declarations: [AccueilPage]
})
export class AccueilPageModule {}
