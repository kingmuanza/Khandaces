import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonprofilPhotoPageRoutingModule } from './monprofil-photo-routing.module';

import { MonprofilPhotoPage } from './monprofil-photo.page';
import { AngularCropperjsModule } from 'angular-cropperjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularCropperjsModule,
    MonprofilPhotoPageRoutingModule
  ],
  declarations: [MonprofilPhotoPage]
})
export class MonprofilPhotoPageModule {}
