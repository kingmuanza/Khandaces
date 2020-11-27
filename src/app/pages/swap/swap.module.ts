import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwapPageRoutingModule } from './swap-routing.module';

import { SwapPage } from './swap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SwapPageRoutingModule
  ],
  declarations: [SwapPage]
})
export class SwapPageModule {}
