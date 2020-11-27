import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComposantsPage } from './composants.page';
import { VideoComponent } from './video/video.component';
import { VisionnageComponent } from './visionnage/visionnage.component';
import { ProfilDisplayComponent } from './profil-display/profil-display.component';
import { CommentairesDisplayComponent } from './commentaires-display/commentaires-display.component';
import { PublicationComponent } from './publication/publication.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    ComposantsPage,
    VideoComponent,
    VisionnageComponent,
    ProfilDisplayComponent,
    CommentairesDisplayComponent,
    PublicationComponent,
  ],
  exports: [
    VisionnageComponent,
    VideoComponent,
    ProfilDisplayComponent,
    CommentairesDisplayComponent,
    PublicationComponent,
  ]
})
export class ComposantsPageModule { }
