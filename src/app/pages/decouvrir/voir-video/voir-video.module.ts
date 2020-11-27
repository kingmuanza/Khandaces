import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoirVideoPageRoutingModule } from './voir-video-routing.module';

import { VoirVideoPage } from './voir-video.page';
import { ComposantsPageModule } from 'src/app/composants/composants.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComposantsPageModule,
    VoirVideoPageRoutingModule
  ],
  declarations: [VoirVideoPage]
})
export class VoirVideoPageModule {}
