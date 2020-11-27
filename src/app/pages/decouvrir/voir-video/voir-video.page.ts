import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonSlides } from '@ionic/angular';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-voir-video',
  templateUrl: './voir-video.page.html',
  styleUrls: ['./voir-video.page.scss'],
})
export class VoirVideoPage implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;
  @ViewChild('slides', { static: true }) slides: IonSlides;

  utilisateur: Utilisateur;
  indexEnCours = 0;

  indexDepart = 0;
  dateDepart = new Date();
  indexArrivee = 0;
  dateArrivee = new Date();

  hauteur = 0;

  videos = new Array<Video>();
  libelle = '';

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.doRefresh();
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        console.log('tag name');
        console.log(id);
        if (id === 'id') {
          this.libelle = 'Récents';
        } else {
          if (id === 'mes') {
            this.libelle = 'Mes vidéos';
          } else {
            this.libelle = '#' + id;
          }
        }
        /*
        this.videoService.getVideo(id).then((video) => {
          this.videos.push(video);
        });
        */
      }
    });
  }

  doRefresh() {
    this.videoService.currentMessage.subscribe((videos) => {
      console.log('videos entre pages');
      console.log(videos);
      this.videos = videos;
    });
  }

  loadVideos() {
    /*
    this.videoService.getVideos(this.videos).then((videos) => {
      this.videos = this.videos.concat(videos);
    }).catch((e) => {
      console.log(e);
    });*/
  }

  changementDeTab(ev) {
    console.log('changementDeTab');
    console.log(ev);
    this.slides.getActiveIndex().then((index: number) => {
      console.log(index);
      this.indexEnCours = index;
      this.slides.length().then((nombre) => {

        console.log('nombre');
        console.log(nombre);
        if (index === nombre - 1) {
          console.log('Chargement de nouvelles vidéos');
          this.loadVideos();
        }
      });
    });
    console.log('this.slides.length');
    console.log(this.slides.length);
  }

  ionSlideTouchStart(ev) {
    console.log('ionSlideTouchStart');
    this.dateDepart = new Date();
    console.log(this.dateDepart);
    console.log(this.dateDepart.getTime());
    this.slides.getActiveIndex().then((index: number) => {
      console.log(index);
      this.indexDepart = index;
    });
  }

  ionSlideTouchEnd($event) {
    console.log('ionSlideTouchEnd');
    this.dateArrivee = new Date();
    console.log(this.dateArrivee);
    console.log(this.dateArrivee.getTime());
    console.log('DIFFEENCE !!!!');
    console.log(this.dateArrivee.getTime() - this.dateDepart.getTime());
    if (this.dateArrivee.getTime() - this.dateDepart.getTime() > 200) {
      setTimeout(() => {
        this.slides.getActiveIndex().then((index: number) => {
          console.log(index);
          this.indexArrivee = index;
          if (this.indexArrivee === 0 && this.indexDepart === 0) {
            console.log('Il faut rafraihir la page');
            this.doRefresh();
          }
        });
      }, 500);
    }
  }

}
