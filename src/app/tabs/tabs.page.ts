import { Component, ViewChild, OnInit } from '@angular/core';
import { TabService } from '../services/tab.service';
import { Subscription } from 'rxjs';
import { Video } from '../models/video.model';
import { NavigationEnd, ResolveStart, Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {

  isAccueil = true;
  isSwap = true;

  isVisible = true;
  isVisibleSubscription: Subscription;

  translucide = true;
  translucideSubscription: Subscription;

  isCommentaires = false;
  isCommentairesSubscription: Subscription;

  videoEnLecture: Video;
  videoEnLectureSubscription: Subscription;

  clicContenu = false;
  clicCommentaires = false;

  constructor(
    private tabService: TabService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      // console.log('La route a changé');
      let url = '';
      if (val instanceof NavigationEnd) {
        url = val.url;
      }
      if (val instanceof ResolveStart) {
        url = val.url;
      }
      // console.log(url);
      this.updateDesignTab(url);
    });
    this.isVisibleSubscription = this.tabService.visibleSubject.subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
    this.isCommentairesSubscription = this.tabService.commentairesSubject.subscribe((isCommentaires) => {
      this.isCommentaires = isCommentaires;
    });
    this.videoEnLectureSubscription = this.tabService.videoEnLectureSubject.subscribe((videoEnLecture) => {
      this.videoEnLecture = videoEnLecture;
      // console.log('videoEnLecture');
      // console.log(videoEnLecture);
    });
    this.translucideSubscription = this.tabService.translucideSubject.subscribe((translucide) => {
      this.translucide = translucide;
    });
    this.tabService.emit();
  }

  updateDesignTab(url: string) {
    const navigation = url.split('/');
    // console.log('Navigation');
    // console.log(navigation);
    if (navigation.indexOf('monprofil') !== -1) {
      // console.log('Visite du profil');
      this.translucide = false;
    }
    if (navigation.indexOf('boutique') !== -1) {
      // console.log('belle Boutique');
      this.translucide = false;
    }
    if (navigation.indexOf('swap') !== -1) {
      // console.log('Time to swaaaap');
      this.translucide = true;
    }
    if (navigation.indexOf('decouvrir') !== -1) {
      // console.log('Il faut décourvrriir');
      this.translucide = false;
    }
    if (navigation.indexOf('accueil') !== -1) {
      // console.log('Bienvenure à laccueil');
      this.translucide = true;
    }
  }

  ionTabsWillChange(ev) {
    // console.log(ev);
    // console.log('ionTabsWillChange');
  }

  ionTabsDidChange(ev) {
    // console.log(ev);
    // console.log('ionTabsDidChange');
    if (ev.tab === 'accueil') {
      // console.log('accueil');
      this.tabService.translucide = true;
      this.tabService.emit();
    }
    if (ev.tab === 'swap') {
      this.isSwap = true;
      // console.log('isSwap');
    } else {
      this.isSwap = false;
      // console.log('isNotSwap');
    }
  }

  changerDesign() {
    // console.log('Je vais changer le design');
  }

  clicSurCommentaires() {
    setTimeout(() => {
      if (this.clicContenu) {

      } else {
        this.isCommentaires = false;
        this.tabService.voirCommentaires = false;
        this.tabService.emit();
      }
    }, 200);
  }
  clicSurContenu() {
    this.clicContenu = true;

    setTimeout(() => {

      this.clicContenu = false;
    }, 300);
  }

}
