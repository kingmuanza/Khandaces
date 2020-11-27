import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Abonnement } from 'src/app/models/abonnement.model';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-profil-display',
  templateUrl: './profil-display.component.html',
  styleUrls: ['./profil-display.component.scss'],
})
export class ProfilDisplayComponent implements OnInit, OnDestroy, OnChanges {

  @Input() utilisateur: Utilisateur;
  videos = new Array<Video>();
  mesVideos = new Array<Video>();
  autresVideos = new Array<Video>();
  segmentValue = 'videocam';
  abonnee = false;
  profilsSimilaires = new Array<Utilisateur>();
  voirProfilsSimilaires = false;

  abonnements = 0;
  abonnes = 0;

  paramSub;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private videoService: VideoService,
    private tabService: TabService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.tabService.translucide = true;
    this.tabService.emit();
    this.paramSub = this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      console.log('id');
      console.log(id);
      if (id) {
        this.getProfil(id).then((utilisateur) => {
          console.log('utilisateur');
          console.log(utilisateur);
          if (utilisateur) {
            this.utilisateur = utilisateur;
            this.getVideos(utilisateur).then((videos) => {
              this.videos = videos;
            });
            this.getProfilsSimilaires().then((profilsSimilaires) => {
              console.log('Chargement des profils similaires');
              this.profilsSimilaires = profilsSimilaires;
            });
            this.getAbonnements();
            this.getAbonnes();
          } else {
            this.router.navigate(['tabs', 'accueil']);
          }
        });
      } else {
        this.router.navigate(['tabs', 'accueil']);
      }
    });
  }

  voirAbonnements() {
    this.router.navigate(['tabs', 'accueil', 'abonnements', this.utilisateur.id]);
  }

  voirAbonnes() {
    this.router.navigate(['tabs', 'accueil', 'abonnements', this.utilisateur.id, 'abonnes']);
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

  estUnAbonnement(star: Utilisateur) {
    let mesAbonnements = new Array<string>();
    const userString = localStorage.getItem('KhandacesMonProfil');
    const utilisateur = JSON.parse(userString) as Utilisateur;
    const abonnements = localStorage.getItem('KhandacesAbonnements');
    if (abonnements) {
      mesAbonnements = JSON.parse(abonnements) as Array<string>;
      if (mesAbonnements.indexOf(star.id) !== -1) {
        return true;
      }
    }
    return false;
  }

  getProfil(id: string): Promise<Utilisateur> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').doc(id).get().then((resultat) => {
        const utilisateur = resultat.data() as Utilisateur;
        resolve(utilisateur);
      });
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

  toggleVoirProfilsSimilaires() {
    this.voirProfilsSimilaires = !this.voirProfilsSimilaires;
  }

  sabonner(star: Utilisateur) {
    const db = firebase.firestore();
    const userString = localStorage.getItem('KhandacesMonProfil');
    let mesAbonnements = new Array<string>();
    const abonnements = localStorage.getItem('KhandacesAbonnements');
    if (abonnements) {
      mesAbonnements = JSON.parse(abonnements);
    }
    if (userString) {
      const utilisateur = JSON.parse(userString) as Utilisateur;
      const abonnement = new Abonnement(utilisateur, star);
      db.collection('abonnements').doc(abonnement.id).set(JSON.parse(JSON.stringify(abonnement))).then(() => {
        mesAbonnements.push(star.id);
        localStorage.setItem('KhandacesAbonnements', JSON.stringify(mesAbonnements));
        this.estUnAbonnement(star);
        this.voirProfilsSimilaires = true;
        this.getProfilsSimilaires().then((profilsSimilaires) => {
          this.profilsSimilaires = profilsSimilaires;
        });
        this.getAbonnements();
      });
    }
  }

  sedesabonner(star: Utilisateur) {
    const db = firebase.firestore();
    const userString = localStorage.getItem('KhandacesMonProfil');
    let mesAbonnements = new Array<string>();
    const abonnements = localStorage.getItem('KhandacesAbonnements');
    if (abonnements) {
      mesAbonnements = JSON.parse(abonnements);
    }
    if (userString) {
      const utilisateur = JSON.parse(userString) as Utilisateur;
      const abonnement = new Abonnement(utilisateur, star);
      db.collection('abonnements').doc(abonnement.id).delete().then(() => {
        this.abonnee = false;
        mesAbonnements = mesAbonnements.filter((e) => e !== star.id);
        localStorage.setItem('KhandacesAbonnements', JSON.stringify(mesAbonnements));
        this.getAbonnements();
      });
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.segmentValue = ev.detail.value;
  }
  toggleAbo() {
    this.abonnee = !this.abonnee;
  }

  getProfilsSimilaires(): Promise<Array<Utilisateur>> {
    const moiString = localStorage.getItem('KhandacesMonProfil');
    if (moiString) {
      const moi = JSON.parse(moiString) as Utilisateur;

      const db = firebase.firestore();
      const utilisateurs = new Array<Utilisateur>();
      return new Promise((resolve, reject) => {
        db.collection('utilisateurs').get().then((resultats) => {
          resultats.forEach((resultat) => {
            const utilisateur = resultat.data() as Utilisateur;
            if (utilisateur.id !== this.utilisateur.id && utilisateur.id !== moi.id) {
              if (!this.estUnAbonnement(utilisateur)) {
                utilisateurs.push(utilisateur);
              }
            }
          });
          resolve(utilisateurs);
        });
      });
    }
  }

  voirProfil(utilisateur: Utilisateur) {
    this.router.navigate(['tabs', 'accueil', 'profil', utilisateur.id]);
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

}
