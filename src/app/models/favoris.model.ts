import { Utilisateur } from './utilisateur.model';
import { Video } from './video.model';

export class Favoris {
    id: string;
    utilisateur: Utilisateur;
    video: Video;

    constructor(u: Utilisateur, video: Video) {
        this.id = u.id + video.id;
        this.utilisateur = u;
        delete this.utilisateur.passe;
        this.video = video;
    }

}
