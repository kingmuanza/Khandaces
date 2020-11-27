import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditerVideoPageRoutingModule } from './editer-video-routing.module';

import { EditerVideoPage } from './editer-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditerVideoPageRoutingModule
  ],
  declarations: [EditerVideoPage]
})
export class EditerVideoPageModule {}
