import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';
import { ActionSheetController } from '@ionic/angular';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { TabService } from 'src/app/services/tab.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monprofil',
  templateUrl: './monprofil.page.html',
  styleUrls: ['./monprofil.page.scss'],
})
export class MonprofilPage implements OnInit {

  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;
  videos = new Array<Video>();
  segmentValue = 'videocam';
  abonnee = true;

  abonnements = 0;
  abonnes = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private videoService: VideoService,
    private authService: AuthentificationService,
    public actionSheetController: ActionSheetController,
    private statusBar: StatusBar,
    private tabService: TabService
  ) { }

  ngOnInit() {
    this.utilisateurSubscription = this.authService.utilisateurSubject.subscribe((utilisateur) => {
      this.utilisateur = utilisateur;
      this.initData();
    });
    const userString = localStorage.getItem('KhandacesMonProfil');
    if (userString) {
      this.utilisateur = JSON.parse(userString) as Utilisateur;
      this.initData();
    }

    // Native
    this.tabService.translucide = false;
    this.tabService.emit();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#cb8d22');
  }

  initData() {
    this.authService.getUtilisateur(this.utilisateur.id).then((utilisateur) => {
      this.utilisateur = utilisateur;
      this.getAbonnements();
      this.getAbonnes();
      this.getVideos(utilisateur).then((videos) => {
        this.videos = videos;
        console.log('videos');
        console.log(videos);
      });
    });
  }

  connexion() {
    this.router.navigate(['tabs', 'monprofil', 'monprofil-connexion']);
  }

  inscription() {
    this.router.navigate(['tabs', 'monprofil', 'monprofil-creation']);
  }

  getAbonnements() {
    const db = firebase.firestore();
    db.collection('abonnements').where('celuiQuiSabonne.id', '==', this.utilisateur.id).get().then((resultats) => {
      this.abonnements = resultats.size;
    });
  }

  getAbonnes() {
    const db = firebase.firestore();
    db.collection('abonnements').where('star.id', '==', this.utilisateur.id).get().then((resultats) => {
      this.abonnes = resultats.size;
    });
  }

  getVideos(utilisateur: Utilisateur): Promise<Array<Video>> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      const videos = new Array<Video>();
      db.collection('videos').where('utilisateur.id', '==', utilisateur.id).get().then((resultats) => {
        resultats.forEach((resultat) => {
          const video = resultat.data() as Video;
          videos.push(video);
        });
        resolve(videos);
      });
    });
  }

  voirVideo(video: Video) {
    const vids = new Array<Video>();
    vids.push(video);
    this.videos.forEach((v) => {
      if (v.id !== video.id) {
        vids.push(v);
      }
    });
    this.newMessage(vids);
    this.router.navigate(['tabs', 'monprofil', 'voir-video', 'mes']);
  }

  newMessage(videos: Array<Video>) {
    this.videoService.changeMessage(videos);
  }

  edit() {
    this.router.navigate(['tabs', 'monprofil', 'edit']);
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.segmentValue = ev.detail.value;
  }
  toggleAbo() {
    this.abonnee = !this.abonnee;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Passer au compte pro',
        role: 'destructive',
        icon: 'checkmark-circle-outline',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Changer mon mot de passe',
        role: 'destructive',
        icon: 'lock-closed-outline',
        handler: () => {
          this.router.navigate(['tabs', 'monprofil', 'passe']);
        }
      }, {
        text: 'Supprimer mon compte',
        icon: 'trash-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Déconnexion',
        icon: 'power-outline',
        handler: () => {
          console.log('deconnexion clicked');
          this.deconnexion();
        }
      }]
    });
    await actionSheet.present();
  }

  deconnexion() {
    this.utilisateur = null;
    localStorage.removeItem('KhandacesMonProfil');
    // this.router.navigate(['tabs', 'swap', 'connexion']);
  }

  voirAbonnements() {
    this.router.navigate(['tabs', 'accueil', 'abonnements', this.utilisateur.id]);
  }

  voirAbonnes() {
    this.router.navigate(['tabs', 'accueil', 'abonnements', this.utilisateur.id, 'abonnes']);
  }
}
