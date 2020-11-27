import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CropperComponent } from 'angular-cropperjs';
import * as firebase from 'firebase';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-monprofil-photo',
  templateUrl: './monprofil-photo.page.html',
  styleUrls: ['./monprofil-photo.page.scss'],
})
export class MonprofilPhotoPage implements OnInit {

  @ViewChild('angularCropper') public angularCropper: CropperComponent;
  @ViewChild('fileButton', { static: false }) fileButton;

  cropperOptions = {
    initialAspectRatio: 1,
    aspectRatio: 1,
    checkCrossOrigin: false
  };

  utilisateur: Utilisateur;
  photoURL: string;
  photo: File;
  progress = 0;

  constructor(
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
  }

  galerie() {
    this.fileButton.nativeElement.click();
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

  saveImage() {
    const utilisateur = this.utilisateur;
    const photoFinale = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/png');
    if (photoFinale) {
      const storage = firebase.storage().ref('pp/' + utilisateur.id);
      const telechargement = storage.putString(photoFinale, 'data_url');
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
            utilisateur.photoURL = url;
            localStorage.setItem('KhandacesMonProfil', JSON.stringify(utilisateur));
            this.authService.updateProfil(utilisateur).then(() => {
              // this.initForm();
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
