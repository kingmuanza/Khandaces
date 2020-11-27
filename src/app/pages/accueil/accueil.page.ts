import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Video } from 'src/app/models/video.model';
import { IonContent, Platform, IonSlides } from '@ionic/angular';
import { VideoService } from 'src/app/services/video.service';
import { Subscription } from 'rxjs';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

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

  // userInfoList: any = [];
  userInfoList: any[] = [];  // tried this also

  constructor(
    private platform: Platform,
    private videoService: VideoService,
    private statusBar: StatusBar,
    private tabService: TabService
  ) {
    this.userInfoList.push('payload');
    platform.ready().then((readySource) => {
      // console.log('Width: ' + platform.width());
      // console.log('Height: ' + platform.height());
      this.hauteur = platform.height();
    });
  }

  ngOnInit() {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#cb8d22');
    this.loadVideos();
    this.tabService.translucide = true;
    this.tabService.visible = true;
    this.tabService.emit();
  }

  doRefresh() {
    this.videoService.getVideos().then((videos) => {
      this.videos = videos;
    }).catch((e) => {
      console.log(e);
    });
  }

  loadVideos() {
    this.videoService.getVideos(this.videos).then((videos) => {
      this.videos = this.videos.concat(videos);
    }).catch((e) => {
      console.log(e);
    });
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
