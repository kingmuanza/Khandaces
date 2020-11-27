import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-passe',
  templateUrl: './passe.page.html',
  styleUrls: ['./passe.page.scss'],
})
export class PassePage implements OnInit {

  form: FormGroup;
  etape1 = true;
  etape2 = false;
  ancienValide = false;
  ancienCorrecte = false;
  constructor(
    private authService: AuthentificationService,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  suivant() {
    const ancien = this.form.value.ancien;
    this.verifierPasse(ancien).then((val) => {
      if (val) {
        this.etape1 = false;
        this.etape2 = true;
      }
    }).catch(() => {
      this.presentToast('Mot de passe incorrect');
    });

  }

  initForm() {
    this.form = this.formBuilder.group({
      ancien: ['', [Validators.required, Validators.minLength(5)]],
      passe: ['', [Validators.required, Validators.minLength(5)]],
      confirm: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.form.controls.ancien.valueChanges.subscribe((val) => {
      console.log(val);
      if (val.length > 4) {
        this.ancienValide = true;
      }
    });
  }

  onSubmitForm() {
    const value = this.form.value;
    console.log('value');
    console.log(value);

    const userString = localStorage.getItem('KhandacesMonProfil');
    if (userString) {
      const utilisateur = JSON.parse(userString) as Utilisateur;
      if (value.passe === value.confirm) {
        this.authService.updatePasse(utilisateur, value.passe).then((u) => {
          console.log('utilisateur');
          console.log(u);
          this.presentToast('Votre mot de passe a été mis à jour. Veuillez vous reconnecter').then(() => {
            this.router.navigate(['tabs', 'swap', 'connexion']);
          });
        }).catch((e) => {
          console.log('errreur');
          console.log(e);
        });

      } else {
        this.presentToast('Les mots de passe ne sont pas identiques').then(() => {
        });
      }
    } else {
      this.presentToast('Aucun utilisateur trouvé').then(() => {
      });
    }
  }

  async presentToast(texte) {
    const toast = await this.toastController.create({
      message: texte,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  verifierPasse(passe) {
    return new Promise((resolve, reject) => {
      const userString = localStorage.getItem('KhandacesMonProfil');
      if (userString) {
        const utilisateur = JSON.parse(userString) as Utilisateur;
        const email = utilisateur.email;
        this.authService.connexion(email, passe).then(() => {
          this.ancienCorrecte = true;
          resolve(true);
        }).catch((e) => {
          this.ancienCorrecte = false;
          reject(false);
        });
      } else {
        console.log('Aucun utilisateur trouvé');
      }

    });
  }

}
