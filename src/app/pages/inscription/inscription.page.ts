import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  form: FormGroup;
  utilisateurExiste = false;
  constructor(
    private authService: AuthentificationService,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      passe: ['', [Validators.required, Validators.minLength(5)]],
      confirm: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.form.controls.login.valueChanges.subscribe((val: string) => {
      console.log(val);
      if (val.indexOf('@') !== -1 && val.indexOf('.') !== -1) {
        this.verifierEmail(val);
      }
    });
  }

  onSubmitForm() {
    const value = this.form.value;
    console.log('value');
    console.log(value);
    if (value.passe === value.confirm) {
      const utilisateur = new Utilisateur('', '');
      utilisateur.email = value.login;
      utilisateur.passe = value.passe;
      utilisateur.vientDeSinscrire = true;
      this.authService.inscription(utilisateur).then((u) => {
        console.log('utilisateur');
        console.log(u);
        this.router.navigate(['tabs', 'monprofil', 'edit']);
      }).catch((e) => {
        console.log('errreur');
        console.log(e);
      });
    } else {
      this.presentToast().then(() => {
      });
    }
  }

  verifierEmail(email) {
    console.log('verification');
    const db = firebase.firestore();
    this.utilisateurExiste = false;
    db.collection('utilisateurs').where('email', '==', email).get().then((resultats) => {
      resultats.forEach((resultat) => {
        if (resultat.exists) {
          this.utilisateurExiste = true;
          console.log('lutilisateur existe');
        }
      });
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Les mots de passe ne sont pas identiques',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  connexion() {
    this.router.navigate(['tabs', 'swap', 'connexion']);
  }

  authGoogle() {
    console.log('Google auth');
    this.authService.authGoogle().then((utilisateur) => {
      console.log('utilisateur');
      console.log(utilisateur);
      if (utilisateur.pseudo) {
        this.router.navigate(['tabs', 'monprofil']);
      } else {
        this.router.navigate(['tabs', 'monprofil', 'edit']);
      }
    });
  }

  authFacebook() {
    console.log('Facebook auth');
    this.authService.authFacebook().then((utilisateur) => {
      console.log('utilisateur');
      console.log(utilisateur);
      if (utilisateur.pseudo) {
        this.router.navigate(['tabs', 'monprofil']);
      } else {
        this.router.navigate(['tabs', 'monprofil', 'edit']);
      }
    });
  }

}
