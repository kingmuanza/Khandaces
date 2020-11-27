import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoirUtilisateurPageRoutingModule } from './voir-utilisateur-routing.module';

import { VoirUtilisateurPage } from './voir-utilisateur.page';
import { ComposantsPageModule } from 'src/app/composants/composants.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComposantsPageModule,
    VoirUtilisateurPageRoutingModule
  ],
  declarations: [VoirUtilisateurPage]
})
export class VoirUtilisateurPageModule {}
