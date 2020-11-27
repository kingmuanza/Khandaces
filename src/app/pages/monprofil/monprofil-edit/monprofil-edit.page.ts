import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import * as firebase from 'firebase';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-monprofil-edit',
  templateUrl: './monprofil-edit.page.html',
  styleUrls: ['./monprofil-edit.page.scss'],
})
export class MonprofilEditPage implements OnInit {

  @ViewChild('fileButton', { static: false }) fileButton;

  utilisateur: Utilisateur;
  photoURL: string;
  photo: File;
  form: FormGroup;
  progress = 0;
  pseudoDisponible = true;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private authService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit() {
    const userString = localStorage.getItem('KhandacesMonProfil');
    if (userString) {
      this.utilisateur = JSON.parse(userString) as Utilisateur;
      console.log('utilisateur');
      console.log(this.utilisateur);
      this.photoURL = this.utilisateur.photoURL;
    }
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      pseudo: [this.utilisateur ? this.utilisateur.pseudo : '', Validators.required],
      nom: [this.utilisateur ? this.utilisateur.nom : '', Validators.required],
      prenom: [this.utilisateur ? this.utilisateur.prenom : '', Validators.required],
      description: [this.utilisateur ? this.utilisateur.description : '', [Validators.required, Validators.maxLength(100)]],
    });
    this.form.valueChanges.subscribe((val) => {
      // console.log(val);
      const pseudo = val.pseudo as string;
      console.log(pseudo);
      const format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
      console.log('format.test(pseudo)');
      console.log(format.test(pseudo));
      if (pseudo.indexOf(' ') !== -1 || format.test(pseudo)) {
        const nouveau = pseudo.slice(0, -1);
        this.form.patchValue({
          pseudo: nouveau
        });
        this.presentToast('Le pseudo ne peut pas comporter d\'espace ni de caractères spéciaux').then(() => {

        });
      } else {
        this.pseudoEstDisponible(pseudo, this.utilisateur).then((disponible) => {
          this.pseudoDisponible = disponible;
        });
      }
    });
  }

  pseudoEstDisponible(pseudo: string, utilisateur: Utilisateur): Promise<boolean> {
    return this.authService.pseudoEstDisponible(pseudo, utilisateur);
  }

  save() {
    const value = this.form.value;
    const userString = localStorage.getItem('KhandacesMonProfil');
    if (userString) {
      const utilisateur = JSON.parse(userString) as Utilisateur;
      utilisateur.pseudo = value.pseudo;
      utilisateur.nom = value.nom;
      utilisateur.prenom = value.prenom;
      utilisateur.description = value.description;
      utilisateur.vientDeSinscrire = value.false;
      if (this.photoURL) {
        utilisateur.photoURL = this.photoURL;
      }
      console.log('utilisateur modifié');
      console.log(utilisateur);
      if (this.photo) {
        this.saveImage(utilisateur);
      } else {
        this.authService.updateProfil(utilisateur).then(() => {
          localStorage.setItem('KhandacesMonProfil', JSON.stringify(utilisateur));
          this.initForm();
          this.presentToast('Enregistré').then(() => {
            this.router.navigate(['tabs', 'monprofil']);
          });
        });
      }
    } else {
      this.router.navigate(['tabs', 'swap', 'connexion']);
    }
  }

  galerie() {
    this.router.navigate(['tabs', 'monprofil', 'monprofil-photo']);
  }

  uploadFile(event: any) {
    console.log(event.target.files);

    if (event.target.files && event.target.files[0]) {
      this.photo = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.photoURL = e.target.result;
        console.log('this.photoURL');
        console.log(this.photoURL);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  saveImage(utilisateur: Utilisateur) {
    if (this.photo) {
      const storage = firebase.storage().ref('pp/' + utilisateur.id);
      const telechargement = storage.put(this.photo);
      telechargement.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
          this.progress = progress;
        },
        (error) => {
          console.log('error');
          console.log(error);
        },
        () => {
          storage.getDownloadURL().then((url) => {
            console.log('url');
            console.log(url);
            localStorage.setItem('KhandacesMonProfil', JSON.stringify(utilisateur));
            utilisateur.photoURL = url;
            this.authService.updateProfil(utilisateur).then(() => {
              this.initForm();
              this.presentToast('Enregistré').then(() => {
                this.router.navigate(['tabs', 'monprofil']);
              });
            });
          });
          console.log('Téléchargement terminé');
        }
      );
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

}
