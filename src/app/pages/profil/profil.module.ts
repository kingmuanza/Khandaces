import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';
import { ComposantsPageModule } from 'src/app/composants/composants.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComposantsPageModule,
    ProfilPageRoutingModule
  ],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
