import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';
import { Utilisateur } from './models/utilisateur.model';
import { Subscription } from 'rxjs';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authservice: AuthentificationService
  ) {
    this.initializeApp();
    const FIREBASE_CONFIG = {
      apiKey: 'AIzaSyAsnB1WWDIGAEprVMnU8FyiWZZHAHIiYuU',
      authDomain: 'khandaces.firebaseapp.com',
      databaseURL: 'https://khandaces.firebaseio.com',
      projectId: 'khandaces',
      storageBucket: 'khandaces.appspot.com',
      messagingSenderId: '40236602313',
      appId: '1:40236602313:web:685c2440b65e368ed0ce18',
      measurementId: 'G-4ZJ5WJCRN8'
    };
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  ngOnInit(): void {
    console.log('Démarage de lapplication');
    const userString = localStorage.getItem('KhandacesMonProfil');
    if (userString) {
      this.utilisateur = JSON.parse(userString) as Utilisateur;
      this.authservice.utilisateur = this.utilisateur;
      this.authservice.emit();
    }
  }

  initializeApp() {
    const visible = window.statusbar.visible;
    console.log('satus bar visible');
    console.log('satus bar visible');
    console.log('satus bar visible');
    console.log('satus bar visible');
    console.log(visible);
    console.log(window.statusbar);

    this.platform.ready().then(() => {
      localStorage.removeItem('derniereConnexion');
      console.log('IL EST SUR LAPPLICATION LA !!!');
      if (this.checkIsPremiereConnexion()) {
        setTimeout(() => {
          alert('Vous bénéficiez de 50 points gratuits pour la journée !');
          localStorage.setItem('pointsGratuits', JSON.stringify(50));
        }, 1000000);
      }
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#cb8d22');
      this.splashScreen.hide();

    });
  }

  checkIsPremiereConnexion(): boolean {
    let resultat = false;
    const dateDuJour = new Date().toISOString().split('T')[0];
    console.log('Date du jour');
    console.log(dateDuJour);
    const premiereHeure = new Date(dateDuJour + ' 00:00:01');
    console.log(premiereHeure);

    const derniereConnexionString = localStorage.getItem('derniereConnexion');

    if (derniereConnexionString) {
      const derniereConnexionDate = JSON.parse(derniereConnexionString);
      const date = new Date(derniereConnexionDate);
      console.log('Date de la derniere connexion');
      console.log(date);

      // On vérifie que je ne me suis pas connecté aujourdhui
      if (date.getTime() > premiereHeure.getTime()) {
        console.log('Ce nest pas la premiere conexxion !!');
      } else {
        console.log('Premiere connexion du jour !!');
        resultat = true;
      }
    } else {
      const date = new Date();
      localStorage.setItem('derniereConnexion', JSON.stringify(date));
      console.log('Premiere connexion du jour !!');
      console.log(date);
      resultat = true;
    }
    return resultat;
  }
}
