import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbonnementsPageRoutingModule } from './abonnements-routing.module';

import { AbonnementsPage } from './abonnements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbonnementsPageRoutingModule
  ],
  declarations: [AbonnementsPage]
})
export class AbonnementsPageModule {}
