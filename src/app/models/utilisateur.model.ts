import { v4 as uuidv4 } from 'uuid';

export class Utilisateur {

    id: string;
    nom: string;
    prenom: string;
    datenaiss: string;
    lieunaiss: string;
    pseudo: string;
    sexe: boolean;
    photoURL: string;
    description: string;
    pro: boolean;
    email: string;
    passe: string;
    vientDeSinscrire: boolean;
    dateInscription: Date;
    nbrAbonnes: number;
    nbrAbonnements: number;

    constructor(pseudo: string, photoUrl: string) {
        this.pseudo = pseudo;
        this.photoURL = photoUrl;
        this.id = this.generateID();
        this.nbrAbonnes = 0;
        this.nbrAbonnements = 0;
        this.dateInscription = new Date();
    }

    generateID() {
        return uuidv4();
    }
}
