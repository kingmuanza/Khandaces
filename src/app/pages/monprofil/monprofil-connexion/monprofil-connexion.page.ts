import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-monprofil-connexion',
  templateUrl: './monprofil-connexion.page.html',
  styleUrls: ['./monprofil-connexion.page.scss'],
})
export class MonprofilConnexionPage implements OnInit {

  form: FormGroup;
  ndem = false;
  mauvaisModeDeConnexion = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      login: 'muanza@gmail.com',
      passe: '123456'
    });
    this.form.valueChanges.subscribe((val) => {
      this.ndem = false;
      this.mauvaisModeDeConnexion = false;
    });
  }

  onSubmitForm() {
    const value = this.form.value;
    this.authService.connexion(value.login, value.passe).then((u) => {
      console.log('Tout se passe bien');
      this.ndem = false;
      this.mauvaisModeDeConnexion = false;
      console.log('utilisateur');
      console.log(u);
      this.authService.utilisateur = u;
      this.authService.emit();
      setTimeout(() => {
        this.router.navigate(['tabs', 'monprofil']);
      }, 200);
    }).catch((e) => {
      console.log(e);
      if (e === 0) {
        console.log('Mauvais mode de connexion');
        this.mauvaisModeDeConnexion = true;
      } else {
        this.ndem = true;
      }
    });
  }

  inscription() {
    this.router.navigate(['tabs', 'monprofil', 'monprofil-creation']);
  }

}
