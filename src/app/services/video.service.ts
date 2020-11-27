import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';
import { Utilisateur } from '../models/utilisateur.model';
import { BehaviorSubject, Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  videos = new Array<Video>();
  videosEncours = new Array<Video>();
  utilisateurs = new Array<Utilisateur>();
  enableScroll = true;
  enableScrollSbuject = new Subject<boolean>();
  public index = 0;

  private messageSource = new BehaviorSubject(new Array<Video>());
  currentMessage = this.messageSource.asObservable();

  constructor() {

  }

  changeMessage(videos: Array<Video>) {
    this.videosEncours = videos;
    this.messageSource.next(videos);
  }

  // passing data between pages

  emit() {
    this.enableScrollSbuject.next(this.enableScroll);
  }

  supprimerVideo(video: Video) {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('videos').doc(video.id).delete().then(() => {
        resolve();
      }).catch((e) => {
        reject(e);
      });
    });
  }

  async saveUtilisateursToFireBase() {
    console.log('saveUtilisateursToFireBase');
    const db = firebase.firestore();
    for (let i = 0; i < this.utilisateurs.length; i++) {
      const u = this.utilisateurs[i];
      console.log(i);
      console.log('utilisateur');
      console.log(u);
      await db.collection('utilisateurs').doc(u.id).set(JSON.parse(JSON.stringify(u)));
    }
    for (let j = 0; j < this.videos.length; j++) {
      const v = this.videos[j];
      console.log(j);
      console.log('video');
      console.log(v);
      await db.collection('videos').doc(v.id).set(JSON.parse(JSON.stringify(v)));
    }
    console.log('Effectué avec succès !!!');
  }

  getLessRecentDateofVideos(recentesVideos?: Array<Video>) {
    let lessRecent = new Date();
    if (recentesVideos) {
      recentesVideos.forEach((v) => {
        if (new Date(v.date).getTime() <= lessRecent.getTime()) {
          lessRecent = new Date(v.date);
        }
      });
    }
    return lessRecent;
  }

  utilisateurALaUne(): Promise<Array<Utilisateur>> {
    const db = firebase.firestore();
    const utilisateurs = [];
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').get().then((resultats) => {
        resultats.forEach((resultat) => {
          const u = resultat.data() as Utilisateur;
          utilisateurs.push(u);
        });
        resolve(utilisateurs);
      });
    });
  }

  getVideos(recentesVideos?: Array<Video>): Promise<Array<Video>> {
    const lessRecent = this.getLessRecentDateofVideos(recentesVideos);
    console.log('lessRecent');
    console.log('lessRecent');
    console.log(lessRecent);
    console.log(lessRecent.toISOString());

    const utilisateur = localStorage.getItem('KhandacesMonProfil');

    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      const videos = [];
      db.collection('videos')
        .where('date', '<=', lessRecent.toISOString())
        .orderBy('date', 'desc')
        // .startAfter(lessRecent.toISOString())
        // .endAt(new Date())
        .limit(2)
        .get().then((resultats) => {
          resultats.forEach((resultat) => {
            const video = resultat.data() as Video;
            let dejaPresente = false;
            if (recentesVideos) {
              recentesVideos.forEach((v) => {
                if (v.id === video.id) {
                  dejaPresente = true;
                }
              });
              if (!dejaPresente) {
                videos.push(video);
              }
            } else {
              videos.push(video);
            }
          });
          if (utilisateur) {
            const u = JSON.parse(utilisateur);
          } else {
            // je veux bien ordonner par période et au nombre de likes
          }
          resolve(videos);
        }).catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }

  getOthersVideos(): Promise<Array<Video>> {

    const utilisateur = localStorage.getItem('KhandacesMonProfil');

    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      const videos = [];
      db.collection('videos')
        .orderBy('date', 'desc')
        // .startAfter(lessRecent.toISOString())
        // .endAt(new Date())
        .get().then((resultats) => {
          resultats.forEach((resultat) => {
            const video = resultat.data() as Video;
            if (utilisateur) {
              const u = JSON.parse(utilisateur) as Utilisateur;
              if (video.utilisateur && video.utilisateur.id !== u.id) {
                videos.push(video);
              }
            } else {
              // Sil nya pas dutilisateur on montre tout
              videos.push(video);
            }
          });
          resolve(videos);
        }).catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }

  getVideo(id: string): Promise<Video> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      const videos = [];
      db.collection('videos')
        .doc(id)
        .get().then((resultat) => {
          const video = resultat.data() as Video;
          resolve(video);
        }).catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }

  getLikes() {
    const utilisateur = localStorage.getItem('KhandacesMonProfil');
    if (utilisateur) {
      const u = JSON.parse(utilisateur);
      const db = firebase.firestore();
      db.collection('likes').where('utilisateur.id', '==', u.id).get().then((resultat) => {

      });
    }
  }

  getUtilisateurs(): Promise<Array<Utilisateur>> {
    return new Promise((resolve, reject) => {
      resolve(this.utilisateurs);
    });
  }

  getUtilisateur(id: string): Promise<Utilisateur> {
    return new Promise((resolve, reject) => {
      this.getUtilisateurs().then((utilisateurs) => {
        utilisateurs.forEach((u) => {
          if (u.id === id) {
            resolve(u);
          }
        });
        resolve(null);
      });
    });
  }
}
