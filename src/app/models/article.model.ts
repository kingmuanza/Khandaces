import { Utilisateur } from './utilisateur.model';

export class Article {
    id: string;
    nom: string;
    boutique: any;
    photoURLs: Array<string>;
    prix: number;
    date: Date;
    quantite: number;
    utilisateur: Utilisateur;
    constructor() {

    }
}
