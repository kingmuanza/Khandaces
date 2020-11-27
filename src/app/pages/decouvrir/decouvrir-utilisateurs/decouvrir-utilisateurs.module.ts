import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecouvrirUtilisateursPageRoutingModule } from './decouvrir-utilisateurs-routing.module';

import { DecouvrirUtilisateursPage } from './decouvrir-utilisateurs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecouvrirUtilisateursPageRoutingModule
  ],
  declarations: [DecouvrirUtilisateursPage]
})
export class DecouvrirUtilisateursPageModule {}
