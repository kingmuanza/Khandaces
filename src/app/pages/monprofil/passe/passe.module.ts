import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassePageRoutingModule } from './passe-routing.module';

import { PassePage } from './passe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PassePageRoutingModule
  ],
  declarations: [PassePage]
})
export class PassePageModule {}
