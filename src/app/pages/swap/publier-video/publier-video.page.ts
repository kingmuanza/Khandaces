import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Video } from 'src/app/models/video.model';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-publier-video',
  templateUrl: './publier-video.page.html',
  styleUrls: ['./publier-video.page.scss'],
})
export class PublierVideoPage implements OnInit, AfterViewInit {

  @ViewChild('video', { static: true }) videoPlayer: ElementRef;

  video: Video;
  utilisateur: Utilisateur;
  legende: string;
  progress = 0;
  filtre = 'bleu';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tabService: TabService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getUtilisateur();
    const videoString = localStorage.getItem('videoAPublier');
    if (videoString) {
      let video: Video;
      video = JSON.parse(videoString);
      this.video = video;
      console.log('La vdideo a pulblier a un fiktre');
      console.log(video.filtre);
      this.filtre = video.filtre;
    }
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        const videoString = localStorage.getItem('videoAPublier');
        if (videoString) {
          let video: Video;
          video = JSON.parse(videoString);
          this.video = video;
          this.videoPlayer.nativeElement.src = this.video.url;
          this.videoPlayer.nativeElement.muted = true;
        }
      }
    });
  }

  getUtilisateur() {
    const userString = localStorage.getItem('KhandacesMonProfil');
    if (userString) {
      this.utilisateur = JSON.parse(userString) as Utilisateur;
      console.log('utilisateur');
      console.log(this.utilisateur);
    }
  }

  publier() {
    if (this.legende) {
      this.video.description = this.legende;
    } else {
      this.video.description = '';
    }
    let tags = [];
    if (this.video.description) {
      tags = this.video.description.match(/#\w+/g);
      console.log('tags 0123456');
      console.log(tags);
    }
    let lesTags = '';
    tags.forEach((tag) => {
      lesTags = lesTags + tag + ' ';
    });
    this.video.tags = lesTags;
    this.video.utilisateur = this.utilisateur;
    console.log(this.video);
    console.log(tags);
    this.saveVideo(this.utilisateur, this.video);
  }

  async saveVideo(utilisateur: Utilisateur, video: Video) {

    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Chargement de la video',
      translucent: false,
      backdropDismiss: false
    });
    loading.present();

    const storage = firebase.storage().ref('video/' + utilisateur.id + '/' + video.id);
    console.log('this.video.url');
    console.log(this.video.url);
    const telechargement = storage.putString(this.video.url, 'data_url');
    telechargement.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
        this.progress = progress;
        console.log('this.progress');
        console.log(this.progress);
      },
      (error) => {
        console.log('error');
        console.log(error);
      },
      () => {
        storage.getDownloadURL().then((url) => {
          console.log('url');
          console.log(url);
          this.video.url = url;
          this.savePoster(utilisateur, video).then((urlposter) => {
            this.video.poster = urlposter;
            console.log('this.video');
            console.log(this.video);
            this.save(this.video);
            loading.dismiss();
          });
        });
        console.log('Téléchargement terminé');
      }
    );
  }

  save(video: Video) {
    const db = firebase.firestore();
    db.collection('videos').doc(video.id).set(video).then(() => {
      this.tabService.visible = true;
      this.tabService.emit();
      this.router.navigate(['tabs', 'accueil']);
    });
  }

  savePoster(utilisateur: Utilisateur, video: Video): Promise<string> {
    const storage = firebase.storage().ref('poster/' + utilisateur.id + '/' + video.id);
    const telechargement = storage.putString(this.video.poster, 'data_url');
    return new Promise((resolve, reject) => {
      telechargement.then((resultat) => {
        storage.getDownloadURL().then((urlposter) => {
          resolve(urlposter);
        });
      }).catch((e) => {
        reject(e);
      });
    });
  }

}
