import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ToastController } from '@ionic/angular';
import { Video } from 'src/app/models/video.model';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.page.html',
  styleUrls: ['./swap.page.scss'],
})
export class SwapPage implements OnInit, AfterViewInit {

  @ViewChild('video', { static: true }) video: ElementRef;
  @ViewChild('fileButton', { static: false }) fileButton;
  @ViewChild('slides', { static: true }) slides: IonSlides;

  source = '';
  poster = '';
  poids = 0;
  // source = '';
  nouvelleVideoEstAjoutee = false;

  gris = false;
  ancien = false;

  constructor(
    private router: Router,
    private tabService: TabService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.video.nativeElement) {
      this.video.nativeElement.muted = true;
    }
  }

  uploadFile(event: any) {
    console.log(event.target.files);
    // let file: File;
    if (event.target.files && event.target.files[0]) {
      const fichier = event.target.files[0];
      this.poids = fichier.size;
      console.log('poids');
      console.log(this.poids);
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const resultat = e.target.result;
        console.log('resultat');
        console.log(resultat);

        this.source = resultat;
        this.video.nativeElement.src = this.source;
        this.video.nativeElement.muted = true;
        console.log('this.video');
        const v = this.video.nativeElement as HTMLVideoElement;
        v.addEventListener('loadeddata', () => {
          console.log('loadeddata');

          console.log(this.video.nativeElement.videoHeight);
          console.log(this.video.nativeElement.videoWidth);
          console.log(this.video.nativeElement.height);
          console.log(this.video.nativeElement.width);
          this.capture(this.video.nativeElement.videoWidth, this.video.nativeElement.videoHeight);
        });
        this.nouvelleVideoEstAjoutee = true;
        this.tabService.visible = false;
        this.tabService.emit();
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  capture(x: number, y: number) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    console.log('canvas');
    console.log(canvas);
    const video = document.getElementById('video') as HTMLVideoElement;
    console.log('video');
    console.log(video);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, x / 2, y / 2);

    const dataURL = canvas.toDataURL();
    console.log('dataURL');
    console.log(dataURL);
    this.poster = dataURL;
  }
  galerie() {
    this.fileButton.nativeElement.click();
  }

  resetView() {
    this.tabService.visible = true;
    this.tabService.emit();
    this.nouvelleVideoEstAjoutee = false;
    this.video.nativeElement.src = '';
  }

  saveBrouillon() {
    const video = new Video('', null, this.source);
    let mesVideos = [];
    const videosString = localStorage.getItem('mesVideos');
    if (videosString) {
      mesVideos = JSON.parse(videosString);
    }
    mesVideos.push(video);
    localStorage.setItem('mesVideos', JSON.stringify(mesVideos));
    return video;
  }

  enregistrer() {
    this.saveBrouillon();
    this.message('La vidéo a été enregistrée dans les brouillons');
  }

  publier() {
    localStorage.removeItem('mesVideos');
    const video = new Video('', null, this.source);
    video.taille = this.poids;
    video.poster = this.poster;
    const duree = this.video.nativeElement.duration;
    if (this.gris) {
      video.filtre = 'gris';
    }
    if (this.ancien) {
      video.filtre = 'ancien';
    }
    console.log('duree');
    console.log(duree);
    console.log(this.video.nativeElement);
    video.duree = duree;
    localStorage.setItem('videoAPublier', JSON.stringify(video));
    this.router.navigate(['tabs', 'swap', 'publier-video', video.id]);
  }

  async message(texte: string) {
    const toast = await this.toastController.create({
      message: texte,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  changementDeTab(ev) {
    console.log('changementDeTab');
    console.log(ev);
    this.slides.getActiveIndex().then((index: number) => {
      console.log('index');
      console.log(index);
      if (index === 1) {
        console.log('gris gris');
        this.gris = true;
      } else {
        this.gris = false;
      }
      if (index === 2) {
        this.ancien = true;
      } else {
        this.ancien = false;
      }
    });
  }

}
