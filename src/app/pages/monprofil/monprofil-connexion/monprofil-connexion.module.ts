import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonprofilConnexionPageRoutingModule } from './monprofil-connexion-routing.module';

import { MonprofilConnexionPage } from './monprofil-connexion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MonprofilConnexionPageRoutingModule
  ],
  declarations: [MonprofilConnexionPage]
})
export class MonprofilConnexionPageModule {}
