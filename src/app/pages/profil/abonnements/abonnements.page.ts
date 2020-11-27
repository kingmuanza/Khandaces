import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Abonnement } from 'src/app/models/abonnement.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';

@Component({
  selector: 'app-abonnements',
  templateUrl: './abonnements.page.html',
  styleUrls: ['./abonnements.page.scss'],
})
export class AbonnementsPage implements OnInit {

  utilisateur: Utilisateur;
  abonnements = new Array<Utilisateur>();
  abonnes = new Array<Utilisateur>();
  segmentValue = 'abonnements';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      console.log('id');
      console.log(id);
      if (id) {
        this.getProfil(id).then((utilisateur) => {
          console.log('utilisateur');
          console.log(utilisateur);
          if (utilisateur) {
            this.utilisateur = utilisateur;
            this.getAbonnements();
            this.getAbonnes();
          }
        });
      }
      const abo = paramMap.get('abo');
      console.log('abo');
      console.log(abo);
      if (abo) {
        this.segmentValue = 'abonnes';
      }
    });
  }

  voir(abo) {
    this.router.navigate(['tabs', 'accueil', 'profil', 'view', abo.id]);
  }

  getProfil(id: string): Promise<Utilisateur> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').doc(id).get().then((resultat) => {
        const utilisateur = resultat.data() as Utilisateur;
        resolve(utilisateur);
      });
    });
  }

  getAbonnes() {
    this.abonnes = new Array<Utilisateur>();
    const db = firebase.firestore();
    db.collection('abonnements').where('star.id', '==', this.utilisateur.id).get().then((resultats) => {
      resultats.forEach((resultat) => {
        const abo = resultat.data() as Utilisateur;
        this.abonnes.push(abo);
      });
    });
  }

  getAbonnements() {
    this.abonnements = new Array<Utilisateur>();
    const db = firebase.firestore();
    db.collection('abonnements').where('celuiQuiSabonne.id', '==', this.utilisateur.id).get().then((resultats) => {
      resultats.forEach((resultat) => {
        const abo = resultat.data() as Utilisateur;
        this.abonnements.push(abo);
      });
    });
  }

  estUnAbonnement(star: Utilisateur) {
    let mesAbonnements = new Array<string>();
    const userString = localStorage.getItem('KhandacesMonProfil');
    const utilisateur = JSON.parse(userString) as Utilisateur;
    const abonnements = localStorage.getItem('KhandacesAbonnements');
    if (abonnements) {
      mesAbonnements = JSON.parse(abonnements) as Array<string>;
      if (mesAbonnements.indexOf(star.id) !== -1) {
        return true;
      }
    }
    return false;
  }

  sabonner(star: Utilisateur) {
    const db = firebase.firestore();
    const userString = localStorage.getItem('KhandacesMonProfil');
    let mesAbonnements = new Array<string>();
    const abonnements = localStorage.getItem('KhandacesAbonnements');
    if (abonnements) {
      mesAbonnements = JSON.parse(abonnements);
    }
    if (userString) {
      const utilisateur = JSON.parse(userString) as Utilisateur;
      const abonnement = new Abonnement(star, utilisateur);
      db.collection('abonnements').doc(abonnement.id).set(JSON.parse(JSON.stringify(abonnement))).then(() => {
        mesAbonnements.push(star.id);
        localStorage.setItem('KhandacesAbonnements', JSON.stringify(mesAbonnements));
        this.estUnAbonnement(star);
      });
    }
  }

  sedesabonner(star: Utilisateur) {
    const db = firebase.firestore();
    const userString = localStorage.getItem('KhandacesMonProfil');
    let mesAbonnements = new Array<string>();
    const abonnements = localStorage.getItem('KhandacesAbonnements');
    if (abonnements) {
      mesAbonnements = JSON.parse(abonnements);
    }
    if (userString) {
      const utilisateur = JSON.parse(userString) as Utilisateur;
      const abonnement = new Abonnement(star, utilisateur);
      db.collection('abonnements').doc(abonnement.id).delete().then(() => {
        mesAbonnements = mesAbonnements.filter((e) => e !== star.id);
        localStorage.setItem('KhandacesAbonnements', JSON.stringify(mesAbonnements));
      });
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.segmentValue = ev.detail.value;
  }

}
