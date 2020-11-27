import { Utilisateur } from './utilisateur.model';

export class Abonnement {

    id: string;
    celuiQuiSabonne: Utilisateur;
    star: Utilisateur;

    constructor(celuiQuiSabonne: Utilisateur, star: Utilisateur) {
        this.id = celuiQuiSabonne.id + star.id;
        this.celuiQuiSabonne = celuiQuiSabonne;
        this.star = star;
    }
}
