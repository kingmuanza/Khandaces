import { v4 as uuidv4 } from 'uuid';
import { Utilisateur } from './utilisateur.model';
import { Video } from './video.model';

export class Commentaire {
    id: string;
    publication: Video;
    utilisateur: Utilisateur;
    date: Date;
    texte: string;
    likes: any;

    constructor() {
        this.id = this.generateID();
        this.date = new Date();

    }

    generateID() {
        return uuidv4();
    }
}
