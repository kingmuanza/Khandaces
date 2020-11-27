import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonprofilCreationPageRoutingModule } from './monprofil-creation-routing.module';

import { MonprofilCreationPage } from './monprofil-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MonprofilCreationPageRoutingModule
  ],
  declarations: [MonprofilCreationPage]
})
export class MonprofilCreationPageModule {}
