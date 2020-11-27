import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublierVideoPageRoutingModule } from './publier-video-routing.module';

import { PublierVideoPage } from './publier-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublierVideoPageRoutingModule
  ],
  declarations: [PublierVideoPage]
})
export class PublierVideoPageModule {}
