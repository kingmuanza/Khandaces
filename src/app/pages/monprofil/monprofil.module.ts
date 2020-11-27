import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonprofilPageRoutingModule } from './monprofil-routing.module';

import { MonprofilPage } from './monprofil.page';
import { ComposantsPageModule } from 'src/app/composants/composants.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComposantsPageModule,
    IonicModule,
    MonprofilPageRoutingModule
  ],
  declarations: [MonprofilPage]
})
export class MonprofilPageModule {}
