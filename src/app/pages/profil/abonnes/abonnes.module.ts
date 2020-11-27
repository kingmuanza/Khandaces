import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbonnesPageRoutingModule } from './abonnes-routing.module';

import { AbonnesPage } from './abonnes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbonnesPageRoutingModule
  ],
  declarations: [AbonnesPage]
})
export class AbonnesPageModule {}
