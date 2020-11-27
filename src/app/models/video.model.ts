import { Utilisateur } from './utilisateur.model';
import { v4 as uuidv4 } from 'uuid';

export class Video {

    id: string;
    date: Date;
    url: string;

    duree: number;
    taille: number;
    poster: string;

    utilisateur: Utilisateur;
    tags: string;
    description: string;
    personnes: Array<Utilisateur>;
    articles: Array<any>;
    cout: number;

    nbrLikes: number; // Estimation
    nbrCommentaires: number; // Estimation
    nbrSwap: number; // Estimation

    filtre: string;

    constructor(id: string, utilisateur: Utilisateur, url?: string) {
        this.id = this.generateID();
        this.url = url;
        this.utilisateur = utilisateur;
        this.date = new Date();
        this.cout = 10;
        this.nbrLikes = 0;
        this.nbrCommentaires = 0;
    }

    generateID() {
        return 'video_' + uuidv4();
    }

    getRandomDate(from: Date, to: Date): Date {
        const f = from.getTime();
        const t = to.getTime();
        return new Date(f + Math.random() * (t - f));
    }

    getRandomTags() {
        const tags = ['meches', 'chignon', 'coiffure', 'femme', 'afrique', 'tresses', 'greffes', ' perruques'];
        let retour = '';
        const nombres = Math.ceil(Math.random() * 5);
        for (let i = 0; i < nombres; i++) {
            const hasard = Math.floor(Math.random() * tags.length);
            retour = retour + '#' + tags[hasard] + ' ';
        }
        return retour;
    }
}
