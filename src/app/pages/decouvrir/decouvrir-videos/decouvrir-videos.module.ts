import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecouvrirVideosPageRoutingModule } from './decouvrir-videos-routing.module';

import { DecouvrirVideosPage } from './decouvrir-videos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecouvrirVideosPageRoutingModule
  ],
  declarations: [DecouvrirVideosPage]
})
export class DecouvrirVideosPageModule {}
