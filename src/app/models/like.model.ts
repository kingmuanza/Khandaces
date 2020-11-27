import { Utilisateur } from './utilisateur.model';
import { Video } from './video.model';

export class Like {
    id: string;
    utilisateur: Utilisateur;
    video: Video;
    date: Date;

    constructor(u: Utilisateur, video: Video) {
        if (u.id && video.id) {
            this.id = u.id + video.id;
            this.utilisateur = u;
            this.utilisateur.passe = null;
            this.video = video;
            this.date = new Date();
        }
    }
}
