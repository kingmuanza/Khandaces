import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() video?: Video;
  @Input() radius = true;
  @Input() like = false;
  @Input() montrerPseudo = true;
  @Input() hauteurMiniature = true;
  @Input() autoplay = false;

  videoPlayer: HTMLVideoElement;
  isSingleClick = true;
  detail = 0;
  notPlaying = true;

  @ViewChild('videoPlayer')
  set mainVideoEl(el: ElementRef) {
    this.videoPlayer = el.nativeElement;
  }

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.play();
  }
  ngAfterViewInit(): void {
    this.play();
  }

  click(event) {
    console.log('event');
    console.log(event);
    this.detail++;
    console.log('this.detail');
    console.log(this.detail);
    setTimeout(() => {
      if (this.detail === 1) {
        this.toggleVideo();
      } else if (this.detail === 2) {
        this.toggleLike();
      }
      this.detail = 0;
    }, 250);
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
        } else {
          if (this.videoPlayer.readyState === 3) {

            this.ready();
          } else {
          }
        }
      };
    }
  }

  ready() {
    this.videoPlayer.muted = true;
    if (this.autoplay) {
      this.videoPlayer.play();
    } else {
      this.videoPlayer.pause();
    }
  }

  toggleVideo() {
    if (this.videoPlayer.paused) {
      this.videoPlayer.play();
      this.notPlaying = false;
    } else {
      this.videoPlayer.pause();
      this.notPlaying = true;
    }
  }

  toggleLike() {
    console.log('double clic sur la video');
    this.like = !this.like;
  }
}
