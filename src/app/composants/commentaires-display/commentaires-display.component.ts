import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import * as firebase from 'firebase';
import { Commentaire } from 'src/app/models/commentaire.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-commentaires-display',
  templateUrl: './commentaires-display.component.html',
  styleUrls: ['./commentaires-display.component.scss'],
})
export class CommentairesDisplayComponent implements OnInit, OnChanges {

  @Input() video: Video;
  texte: string;
  loading = '';
  utilisateur: Utilisateur;

  commentaires = new Array<Commentaire>();

  constructor(
    private videoService: VideoService,
    public toastController: ToastController
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCommentaires();
    const utilisateur = localStorage.getItem('KhandacesMonProfil');
    if (utilisateur) {
      const u = JSON.parse(utilisateur);
      this.utilisateur = u;
    }
  }

  ngOnInit() {
    const utilisateur = localStorage.getItem('KhandacesMonProfil');
    if (utilisateur) {
      const u = JSON.parse(utilisateur);
      this.utilisateur = u;
    }
  }

  getCommentaires() {
    this.commentaires = new Array<Commentaire>();
    const db = firebase.firestore();
    db.collection('commentaires').where('publication.id', '==', this.video.id).get().then((resultats) => {
      this.commentaires = new Array<Commentaire>();
      resultats.forEach((resultat) => {
        const commentaire = resultat.data() as Commentaire;
        this.commentaires.push(commentaire);
      });
    });
  }

  commenter() {
    console.log('this.texte');
    console.log(this.texte);
    const utilisateur = localStorage.getItem('KhandacesMonProfil');
    if (utilisateur) {
      const u = JSON.parse(utilisateur);
      const commentaire = new Commentaire();
      commentaire.utilisateur = u;
      commentaire.texte = this.texte;
      commentaire.publication = this.video;
      console.log('commentaire');
      console.log(commentaire);
      this.loading = commentaire.id;
      this.commentaires.push(commentaire);
      this.texte = '';
      const db = firebase.firestore();
      db.collection('commentaires').doc(commentaire.id).set(JSON.parse(JSON.stringify(commentaire))).then(() => {
        this.loading = '';
      });
    } else {
      this.presentToast('Vous devez vous connecter pour aimer cette vidéo');
    }
  }

  async presentToast(texte) {
    const toast = await this.toastController.create({
      message: texte,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  toggleLikeCommentaire() {

  }

  unlike(commentaire: Commentaire) {
    if (commentaire.likes) {
      const utilisateur = localStorage.getItem('KhandacesMonProfil');
      if (utilisateur) {
        const u = JSON.parse(utilisateur);
        if (commentaire.likes[u.id]) {
          delete commentaire.likes[u.id];
          const leslikes = commentaire.likes;
          console.log('les likes');
          console.log(leslikes);
          const db = firebase.firestore();
          db.collection('commentaires').doc(commentaire.id).update({
            likes: leslikes
          }).then(() => {
            this.loading = '';
          });
        }
      }
    }
  }

  like(commentaire: Commentaire) {
    console.log('commentaire');
    console.log(commentaire.likes);
    const utilisateur = localStorage.getItem('KhandacesMonProfil');
    if (utilisateur) {
      const u = JSON.parse(utilisateur);
      let leslikes = commentaire.likes;
      const db = firebase.firestore();
      if (leslikes) {
        commentaire.likes[u.id] = true;
        db.collection('commentaires').doc(commentaire.id).update({
          likes: leslikes
        }).then(() => {
          this.loading = '';
        });
      } else {
        leslikes = new Object();
        leslikes[u.id] = true;
        commentaire.likes = leslikes;
        db.collection('commentaires').doc(commentaire.id).set(JSON.parse(JSON.stringify(commentaire))).then(() => {
          this.loading = '';
        });
      }
    }
    console.log(commentaire.likes);
  }

}
