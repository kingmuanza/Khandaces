import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import { Platform, IonSlides } from '@ionic/angular';
import { VideoService } from 'src/app/services/video.service';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-visionnage',
  templateUrl: './visionnage.component.html',
  styleUrls: ['./visionnage.component.scss'],
})
export class VisionnageComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() video: Video;
  @Input() position: number;
  @ViewChild('slides', { static: true }) slides: IonSlides;

  videoPlayer: HTMLVideoElement;
  like = false;
  isSingleClick = true;
  detail = 0;
  showDescription = true;
  hauteur = 0;
  pourcentageLecture = 0;
  barreLecture = false;
  muted = true;
  touching = true;
  notReady = true;
  photoURL = '../../../assets/img/moi.jpg';

  @ViewChild('videoPlayer')
  set mainVideoEl(el: ElementRef) {
    this.videoPlayer = el.nativeElement;
  }

  constructor(
    private platform: Platform,
    private videoService: VideoService,
    private tabService: TabService,
  ) {
    platform.ready().then((readySource) => {
      // On récupère la Hauteur de l'écran
      this.hauteur = platform.height();
    });
  }

  ngOnInit() {
    if (this.video.utilisateur.photoURL) {
      this.photoURL = this.video.utilisateur.photoURL;
    }
  }

  ngAfterViewInit(): void {
    this.play();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changements');
    // console.log(this.video);
    console.log(changes);
    if (this.video.utilisateur.photoURL) {
      this.photoURL = this.video.utilisateur.photoURL;
    }
    this.play();
    if (this.videoPlayer && this.video) {
      if (!this.videoPlayer.src) {
        this.videoPlayer.src = this.video.url;
      }
      this.ready();
    }
  }

  changementDeTab(ev) {
    console.log('changementDeTab');
    console.log(ev);
    this.slides.getActiveIndex().then((index: number) => {
      console.log(index);
      if (Number(index) === 1) {
        this.videoService.enableScroll = true;
        this.videoService.emit();
        this.tabService.visible = true;
        this.tabService.emit();
      } else {
        this.videoService.enableScroll = false;
        this.videoService.emit();
        this.tabService.visible = false;
        this.tabService.emit();
      }
    });
  }

  ready() {
    const position = this.position;
    // console.log('position vidéo ' + this.video.id);
    // console.log(this.videoPlayer.offsetTop);
    // console.log(this.videoPlayer.clientTop);
    // console.log('position du scroll');
    // console.log(position);
    this.barreLecture = true;
    if (this.videoPlayer.offsetTop <= position && position < this.videoPlayer.offsetTop + this.hauteur) {
      this.videoPlayer.muted = this.muted;
      // this.videoPlayer.play();
    } else {
      this.videoPlayer.muted = true;
      // this.barreLecture = false;
      // this.videoPlayer.pause();
    }
  }

  play() {
    if (this.video && this.videoPlayer) {
      // Si la vidéo n'a pas de source on lui en donne une;
      if (!this.videoPlayer.src) {
        this.videoPlayer.src = this.video.url;
      }
      this.videoPlayer.onloadeddata = () => {
        if (this.videoPlayer.readyState === 4) {
          this.ready();
          this.notReady = false;
          this.touching = false;
        } else {
          if (this.videoPlayer.readyState === 3) {

            this.ready();
            this.notReady = false;
            this.touching = false;
          } else {
            this.notReady = true;
            this.touching = true;
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

  disparait() {
    this.showDescription = false;
  }

  apparait() {
    this.showDescription = true;
  }

  click(event) {
    console.log('event');
    console.log(event);
    this.detail++;
    console.log('this.detail');
    console.log(this.detail);
    setTimeout(() => {
      if (this.detail === 1) {
        this.disparait();
      } else if (this.detail === 2) {
        this.toggleLike();
      }
      this.detail = 0;
    }, 250);

  }

  click2(event) {
    console.log('event');
    console.log(event);
    this.detail++;
    console.log('this.detail');
    console.log(this.detail);
    setTimeout(() => {
      if (this.detail === 1) {
        this.apparait();
      } else if (this.detail === 2) {
        this.toggleLike();
      }
      this.detail = 0;
    }, 250);
  }

  toggleLike() {
    console.log('double clic sur la video');
    this.like = !this.like;
  }

  toggleMute() {
    console.log('Son ou pas dans la vidéo');
    if (this.videoPlayer) {
      this.muted = !this.muted;
      this.videoPlayer.muted = this.muted;
    }
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

  touchstart(event) {
    console.log(event);
    this.touching = true;
  }

  touchend(event) {
    console.log(event);
    this.touching = false;
  }

  getLibelleDate(d: Date) {
    const date = new Date(d);
    const aujourdhui = new Date();
    const milli = aujourdhui.getTime() - date.getTime();
    const seconds = milli / 1000;
    const minutes = seconds / 60;
    const heures = minutes / 60;
    const jours = heures / 24;

    if (jours > 1) {
      return 'il y a ' + Math.floor(jours) + ' jours';
    } else {
      if (heures > 1) {
        return 'il y a ' + Math.floor(heures) + ' heures';
      } else {
        if (minutes > 1) {
          return 'il y a ' + Math.floor(minutes) + ' mins';
        } else {
          return 'A l\'instant';
        }
      }
    }
  }

}
