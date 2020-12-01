import { Component, OnInit, ViewChild, OnChanges, AfterViewInit, Input, ElementRef, SimpleChanges } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { TabService } from 'src/app/services/tab.service';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import * as firebase from 'firebase';
import { Like } from 'src/app/models/like.model';
import { Subscription } from 'rxjs';
import { Favoris } from 'src/app/models/favoris.model';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { VideoService } from 'src/app/services/video.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() video: Video;
  @Input() index: number;
  @Input() indexEnCours: number;

  showPP = false;

  videoPlayer: HTMLVideoElement;
  pourcentageLecture = 0;
  photoURL = '../../../assets/img/moi.jpg';
  muted = false;
  like = false;
  detail = 0;
  nombreLikes = 0;
  nombreCommentaires = 0;
  commentairesSubscription: Subscription;
  isFavoris = false;
  filtre = 'bleu';

  mavideo = true;

  @ViewChild('videoPlayer')
  set mainVideoEl(el: ElementRef) {
    this.videoPlayer = el.nativeElement;
  }

  constructor(
    private actionSheetController: ActionSheetController,
    private tabService: TabService,
    private authService: AuthentificationService,
    private router: Router,
    private location: Location,
    private videoService: VideoService,
    private socialSharing: SocialSharing,
    public toastController: ToastController) {

  }

  ngOnInit() {
    if (this.video.utilisateur.photoURL) {
      this.photoURL = this.video.utilisateur.photoURL;
    }
    this.commentairesSubscription = this.tabService.commentairesSubject.subscribe((voirCommentaires) => {
      console.log('Visilibité des commentairss !');
      console.log(voirCommentaires);
      if (!voirCommentaires) {
        this.getCommentaires();
      }
    });
    this.tabService.emit();
    this.lecture();
  }

  supprimer() {
    const oui = confirm('Etes-vous sûr de vouloir supprimer la vidéo ?');
    if (oui) {
      this.videoService.supprimerVideo(this.video).then(() => {
        this.presentToast('La vidéo a été supprimée !');
        
        this.location.back();
      });
    }
  }

  partager() {
    console.log('Partage en cours');
    this.socialSharing.share(this.video.description, this.video.utilisateur.pseudo, this.video.url, '').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  voirProfil() {
    this.router.navigate(['tabs', 'accueil', 'profil', this.video.utilisateur.id]);
  }

  ngAfterViewInit(): void {
    this.play();
    this.lecture();
  }

  dosomething(ev) {
    console.log('evenement oyeee');
    console.log(ev);
    this.showPP = true;
  }

  lecture() {
    if (this.index === this.indexEnCours) {
      if (this.videoPlayer) {
        this.videoPlayer.play();
        this.videoPlayer.muted = true;
      }
    } else {
      if (this.videoPlayer) {
        this.videoPlayer.pause();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.video.filtre) {
      this.filtre = this.video.filtre;
    }
    console.log('Changements');
    // console.log(this.video);
    const mesFavoris = localStorage.getItem('KhandacesFavoris');
    if (mesFavoris) {
      const favs = JSON.parse(mesFavoris) as Array<string>;
      if (favs.indexOf(this.video.id) !== -1) {
        this.isFavoris = true;
      }
    }
    this.lecture();
    console.log(changes);
    if (this.video.utilisateur.photoURL) {
      this.photoURL = this.video.utilisateur.photoURL;
    }
    this.play();
    if (this.videoPlayer && this.video) {
      if (!this.videoPlayer.src) {
        this.videoPlayer.src = this.video.url;
      }
    }
    this.getLike();
    this.getLikes();
    this.getCommentaires();
  }

  async presentToast(texte) {
    const toast = await this.toastController.create({
      message: texte,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async commentaires() {
    this.tabService.voirCommentaires = true;
    this.tabService.videoEnLecture = this.video;
    this.tabService.emit();
  }

  play() {
    if (this.video && this.videoPlayer) {
      // Si la vidéo n'a pas de source on lui en donne une;
      if (!this.videoPlayer.src) {
        this.videoPlayer.src = this.video.url;
      }
      this.videoPlayer.onloadeddata = () => {
        if (this.videoPlayer.readyState === 4) {
        } else {
          if (this.videoPlayer.readyState === 3) {
          } else {
          }
        }
      };
      this.videoPlayer.ontimeupdate = () => {
        if (this.videoPlayer.duration && this.videoPlayer.duration > 0) {
          this.pourcentageLecture = this.videoPlayer.currentTime / this.videoPlayer.duration;
        }
      };
    }
  }

  toggleMute() {
    console.log('Son ou pas dans la vidéo');
    if (this.videoPlayer) {
      this.videoPlayer.muted = !this.videoPlayer.muted;
    }
  }

  getLike() {
    const utilisateur = localStorage.getItem('KhandacesMonProfil');
    if (utilisateur) {
      const u = JSON.parse(utilisateur);
      const like = new Like(u, this.video);
      const db = firebase.firestore();
      db.collection('likes').doc(like.id).get().then((resultat) => {
        if (resultat.exists) {
          this.like = true;
          console.log('Vous avez deja like cette video ' + this.video.id);
        } else {
          console.log('Vous navez pas like cette video ' + this.video.id);
        }
      });
    }
  }

  getLikes() {
    const db = firebase.firestore();
    db.collection('likes').where('video.id', '==', this.video.id).get().then((resultats) => {
      this.nombreLikes = resultats.size;
    });
  }

  getCommentaires() {
    const db = firebase.firestore();
    db.collection('commentaires').where('publication.id', '==', this.video.id).get().then((resultats) => {
      this.nombreCommentaires = resultats.size;
    });
  }

  toggleLike() {
    const utilisateur = localStorage.getItem('KhandacesMonProfil');
    if (utilisateur) {
      console.log('clic sur la video');
      this.like = !this.like;
      const u = JSON.parse(utilisateur);
      console.log('utilisateur');
      console.log(u);
      const like = new Like(u, this.video);
      console.log('like');
      console.log(like);
      const db = firebase.firestore();
      if (this.like) {
        db.collection('likes').doc(like.id).set(JSON.parse(JSON.stringify(like))).then(() => {
          this.nombreLikes++;
        });
      } else {
        db.collection('likes').doc(like.id).delete().then(() => {
          this.nombreLikes--;
        });
      }

    } else {
      this.presentToast('Vous devez vous connecter pour aimer cette vidéo');
    }
  }

  click2(event) {
    console.log('event');
    console.log(event);
    this.detail++;
    console.log('this.detail');
    console.log(this.detail);
    setTimeout(() => {
      if (this.detail === 1) {
        this.tooglePlay();
      } else if (this.detail === 2) {
        this.toggleLike();
      }
      this.detail = 0;
    }, 250);
  }

  tooglePlay() {
    console.log('En lecture ou pas');
    if (this.videoPlayer) {
      if (this.videoPlayer.paused) {
        this.videoPlayer.play().then(() => {
          console.log('la vidéo est en cours de lestcure');
        }).catch((e) => {
          console.log(e);
          this.videoPlayer.src = this.video.url;
          this.play();
        });
      } else {
        this.videoPlayer.pause();
      }
    }
  }

  favoris() {
    const db = firebase.firestore();
    const utilisateur = localStorage.getItem('KhandacesMonProfil');
    if (utilisateur) {
      const u = JSON.parse(utilisateur);
      const favoris = new Favoris(u, this.video);
      this.isFavoris = true;
      db.collection('favoris').doc(favoris.id).set(JSON.parse(JSON.stringify(favoris))).then(() => {
        const favorisLocal = localStorage.getItem('KhandacesFavoris');
        let listefavoris = [];
        if (favorisLocal) {
          listefavoris = JSON.parse(favorisLocal);
        }
        listefavoris.push(this.video.id);
        localStorage.setItem('KhandacesFavoris', JSON.stringify(listefavoris));
        this.presentToast('La publication a été ajoutée à vos favoris');
      });
    }
  }

  unfavoris() {
    const db = firebase.firestore();
    const utilisateur = localStorage.getItem('KhandacesMonProfil');
    if (utilisateur) {
      const u = JSON.parse(utilisateur);
      const favoris = new Favoris(u, this.video);
      this.isFavoris = false;
      db.collection('favoris').doc(favoris.id).delete().then(() => {
        const favorisLocal = localStorage.getItem('KhandacesFavoris');
        let listefavoris = [];
        if (favorisLocal) {
          listefavoris = JSON.parse(favorisLocal);
        }
        listefavoris = listefavoris.filter((e) => e !== this.video.id);
        localStorage.setItem('KhandacesFavoris', JSON.stringify(listefavoris));
        this.presentToast('La publication a été retirée de vos favoris');
      });
    }
  }

  generateLibelleDate(video: Video) {
    try {
      if (video.date) {
        const date = new Date(video.date);
        const difference = new Date().getTime() - date.getTime();
        const diffSecondes = difference / 1000;
        if (diffSecondes < 60) {
          return 'A l\'instant';
        } else {
          const diffMinutes = diffSecondes / 60;
          if (diffMinutes < 60) {
            if (Math.floor(diffMinutes) === 1) {
              return 'Il y a une minute';
            } else {
              return 'Il y a ' + Math.floor(diffMinutes) + ' minutes';
            }
          } else {
            const diffHeures = Math.floor(diffMinutes) / 60;
            if (diffHeures < 24) {
              if (Math.floor(diffHeures) === 1) {
                return 'Il y a une heure';
              } else {
                return 'Il y a ' + Math.floor(diffHeures) + ' heures';
              }
            } else {
              const diffJour = Math.floor(diffHeures) / 24;
              if (diffJour < 30) {
                if (Math.floor(diffJour) === 1) {
                  return 'Il y a un jour';
                } else {
                  return 'Il y a ' + Math.floor(diffJour) + ' jours';
                }
              } else {
                const diffMois = Math.floor(diffJour) / 30;
                if (diffMois < 12) {
                  if (Math.floor(diffMois) === 1) {
                    return 'Il y a un mois';
                  } else {
                    return 'Il y a ' + Math.floor(diffMois) + ' mois';
                  }
                } else {
                  const diffAnnees = Math.floor(diffMois) / 12;
                  if (Math.floor(diffAnnees) === 1) {
                    return 'Il y a un an';
                  } else {
                    return 'Il y a ' + Math.floor(diffAnnees) + ' ans';
                  }
                }
              }
            }
          }
        }
      }
    } catch {
      return '';
    }
  }

}
