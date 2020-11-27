import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  utilisateur: Utilisateur;
  utilisateurSubject = new Subject<Utilisateur>();

  constructor() { }

  emit() {
    this.utilisateurSubject.next(this.utilisateur);
  }

  deconnexion() {
    this.utilisateur = null;
    localStorage.removeItem('KhandacesMonProfil');
    this.emit();
  }

  getUtilisateur(id): Promise<Utilisateur> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').doc(id).get().then((resultat) => {
        const utilisateur = resultat.data() as Utilisateur;
        resolve(utilisateur);
      });
    });
  }

  connexion(login: string, passe: string): Promise<Utilisateur> {
    const db = firebase.firestore();
    console.log('login');
    console.log(login);
    console.log('passe');
    console.log(passe);
    let isResult = false;
    return new Promise((resolve, reject) => {

      let bon = false;

      db.collection('utilisateurs').where('email', '==', login).get().then((resultats) => {

        console.log('liste des résultats');
        resultats.forEach((resultat) => {
          isResult = true;
          const utilisateur = resultat.data() as Utilisateur;

          console.log('utilisateur');
          console.log(utilisateur);
          if (utilisateur.passe) {
            bcrypt.compare(passe, utilisateur.passe).then((valid) => {
              console.log('comparaison efectuée');
              if (valid) {
                console.log('les mots de passe sont identiques');
                bon = true;
                localStorage.setItem('KhandacesMonProfil', JSON.stringify(utilisateur));
                this.utilisateur = utilisateur;
                this.emit();
                resolve(utilisateur);
              } else {
                console.log('les mot de passe sont différents');
              }
              console.log('comparaison termineéé');
              if (!bon) {
                reject('Aucun utilisateur correspondant');
              }
            }).catch((e) => {
              reject(0);
            });
          } else {
            reject(0);
          }
        });
        if (!isResult) {
          reject('Aucun utilisateur trouvé');
        }
      }).catch((e) => {
        reject(e);
      });
    });

  }

  autoConnexion() {
    const userString = localStorage.getItem('KhandacesMonProfil');
    if (userString) {
      const user = JSON.parse(userString) as Utilisateur;
      return this.connexion(user.email, user.passe);
    } else {
      return new Promise((resolve, reject) => {
        reject(null);
      });
    }
  }

  pseudoEstDisponible(pseudo, u: Utilisateur): Promise<boolean> {
    const db = firebase.firestore();
    let disponible = true ;
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').where('pseudo', '==', pseudo).get().then((resultats) => {
        resultats.forEach((resultat) => {
          if (resultat.exists) {
            const utilisateur = resultat.data();
            if (utilisateur.id !== u.id) {
              disponible = false;
            }
          }
        });
        resolve(disponible);
      });
    });
  }

  inscription(utilisateur: Utilisateur): Promise<Utilisateur> {
    const u = JSON.parse(JSON.stringify(utilisateur));
    const db = firebase.firestore();
    let utilisateurExiste = false;
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').where('email', '==', utilisateur.email).get().then((resultats) => {
        resultats.forEach((resultat) => {
          if (resultat.exists) {
            utilisateurExiste = true;
            reject('Email déjà existant');
          }
        });
        if (!utilisateurExiste) {
          if (u.passe) {
            bcrypt.hash(u.passe, 5).then((hash) => {
              console.log('hash');
              console.log(hash);
              u.passe = hash;
              localStorage.setItem('KhandacesMonProfil', JSON.stringify(u));
              db.collection('utilisateurs').doc(u.id).set(u).then(() => {
                this.utilisateur = u;
                this.emit();
                resolve(u);
              }).catch((e) => {
                reject(e);
              });
            });
          } else {
            localStorage.setItem('KhandacesMonProfil', JSON.stringify(u));
            db.collection('utilisateurs').doc(u.id).set(u).then(() => {
              this.utilisateur = u;
              this.emit();
              resolve(u);
            }).catch((e) => {
              reject(e);
            });
          }
        }
      });
    });
  }

  updateProfil(utilisateur: Utilisateur) {
    const u = JSON.parse(JSON.stringify(utilisateur));
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').doc(utilisateur.id).set(u).then(() => {
        resolve();
      }).catch((e) => {
        reject();
      });
    });
  }

  updatePasse(utilisateur: Utilisateur, mot: string) {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      bcrypt.hash(mot, 5).then((hash) => {
        db.collection('utilisateurs').doc(utilisateur.id).update({
          passe: hash,
        }).then(() => {
          resolve();
        }).catch((e) => {
          reject();
        });
      });
    });
  }

  /* Google Authentification */
  authGoogle(): Promise<Utilisateur> {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().useDeviceLanguage();
      firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential;
        // The signed-in user info.
        const user = result.user;
        let utilisateur = new Utilisateur('', user.photoURL);
        utilisateur.id = user.uid;
        utilisateur.nom = user.displayName;
        utilisateur.prenom = '';
        utilisateur.email = user.email;
        utilisateur.vientDeSinscrire = true;
        let utilisateurExiste = false;
        const db = firebase.firestore();
        db.collection('utilisateurs').where('email', '==', utilisateur.email).get().then((resultats) => {
          resultats.forEach((resultat) => {
            if (resultat.exists) {
              console.log('Lutilisateur existe dejà');
              utilisateurExiste = true;
              utilisateur = resultat.data() as Utilisateur;
              this.utilisateur = utilisateur;
              localStorage.setItem('KhandacesMonProfil', JSON.stringify(utilisateur));
              this.emit();
              resolve(utilisateur);
            }
          });
          if (!utilisateurExiste) {
            console.log('Lutilisateur existe pas oh');
            this.inscription(utilisateur).then((u) => {
              console.log('inscription reussie !!!');
              resolve(u);
            });
          }
        });

        // ...
        console.log('google result');
        console.log(result);
      }).catch((error) => {
        console.log('google error');
        alert(error);
        console.log(error);
        reject(error);
      });
    });
  }
  /* Google Authentification */
  authFacebook(): Promise<Utilisateur> {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().useDeviceLanguage();
      firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential;
        // The signed-in user info.
        const user = result.user;
        let utilisateur = new Utilisateur('', user.photoURL);
        utilisateur.id = user.uid;
        utilisateur.nom = user.displayName;
        utilisateur.prenom = '';
        utilisateur.email = user.email;
        utilisateur.vientDeSinscrire = true;
        let utilisateurExiste = false;
        const db = firebase.firestore();
        db.collection('utilisateurs').where('email', '==', utilisateur.email).get().then((resultats) => {
          resultats.forEach((resultat) => {
            if (resultat.exists) {
              console.log('Lutilisateur existe dejà');
              utilisateurExiste = true;
              utilisateur = resultat.data() as Utilisateur;
              this.utilisateur = utilisateur;
              localStorage.setItem('KhandacesMonProfil', JSON.stringify(utilisateur));
              this.emit();
              resolve(utilisateur);
            }
          });
          if (!utilisateurExiste) {
            console.log('Lutilisateur existe pas oh');
            this.inscription(utilisateur).then((u) => {
              console.log('inscription reussie !!!');
              resolve(u);
            });
          }
        });

        // ...
        console.log('google result');
        console.log(result);
      }).catch((error) => {
        console.log('google error');
        console.log(error);
        reject(error);
      });
    });
  }
}
