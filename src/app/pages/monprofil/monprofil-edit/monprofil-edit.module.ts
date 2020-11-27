import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonprofilEditPageRoutingModule } from './monprofil-edit-routing.module';

import { MonprofilEditPage } from './monprofil-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MonprofilEditPageRoutingModule
  ],
  declarations: [MonprofilEditPage]
})
export class MonprofilEditPageModule {}
