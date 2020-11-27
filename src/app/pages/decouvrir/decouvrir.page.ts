import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TabService } from 'src/app/services/tab.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decouvrir',
  templateUrl: './decouvrir.page.html',
  styleUrls: ['./decouvrir.page.scss'],
})
export class DecouvrirPage implements OnInit {

  video: Video;
  meilleurUtilisateur: Utilisateur;
  utilisateurs = new Array<Utilisateur>();
  video2: Video;
  videos = new Array<Video>();
  photoURL2 = '';
  tags = new Array<string>();
  TAGS = {};
  lesTags = '';
  rangees = new Array<{
    videos: Array<Video>,
    tagName: string;
  }>();

  rechercheEnCours = false;
  recherche = '';

  resultatsPersonnes = new Array<Utilisateur>();
  resultatsTags = new Array<string>();
  resultatsVideos = new Array<Video>();

  constructor(
    private videoService: VideoService,
    private statusBar: StatusBar,
    private tabService: TabService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('DecouvrirPage');
    this.tabService.translucide = false;
    this.tabService.emit();
    setTimeout(() => {
      this.videoAlaUne();
      this.utilisateurALaUne();
    }, 1000);
  }

  videoAlaUne() {
    this.videoService.getOthersVideos().then((videos) => {
      if (videos.length > 0) {
        const aleatoire = Math.floor(Math.random() * videos.length);
        this.video = videos[aleatoire];
        if (this.video.tags) {
          this.lesTags = this.lesTags + ' ' + this.video.tags;
        }
        if (videos.length > 1) {
          for (let i = 0; i < videos.length; i++) {
            const v = videos[i];
            if (i !== aleatoire) {
              this.videos.push(v);
            }
            if (this.video.tags) {
              this.lesTags = this.lesTags + ' ' + v.tags;
            }
          }
        }
      }

      const division = this.lesTags.split(' ');
      division.forEach((div) => {
        if (div && div.length > 1 && div[0] === '#') {
          if (this.TAGS[div]) {
            this.TAGS[div] = this.TAGS[div] + 1;
          } else {
            this.TAGS[div] = 1;
          }
          this.tags.push(div);
        }
      });

      console.log('this.tags');
      console.log(this.tags);
      const tags = [];
      this.tags.forEach((a) => {
        if (tags.indexOf(a) === -1) {
          tags.push(a);
        }
      });
      console.log('tags uniques');
      console.log(tags);
      this.tags = tags;
      this.tags.sort((a, b) => {
        return this.TAGS[b] - this.TAGS[a];
      });
      console.log(this.tags);
      tags.forEach((tag) => {
        const rangee = {
          tagName: tag,
          videos: this.videos.filter((v) => {
            return v.tags.indexOf(tag + ' ') !== -1;
          })
        };
        this.rangees.push(rangee);
      });
    });
  }

  utilisateurALaUne() {
    console.log('utilisateurALaUne');
    this.videoService.utilisateurALaUne().then((utilisateurALaUne) => {
      console.log(utilisateurALaUne);
      if (utilisateurALaUne.length > 0) {
        const aleatoire = Math.floor(Math.random() * utilisateurALaUne.length);
        this.meilleurUtilisateur = utilisateurALaUne[aleatoire];
        this.utilisateurs = utilisateurALaUne;
        this.photoURL2 = this.meilleurUtilisateur.photoURL;
      }
    });

  }

  rechercher(event) {
    const ev = this.recherche;
    console.log(ev);
    if (ev) {
      this.resultatsVideos = this.videos.filter((v) => {
        return v.tags.indexOf(ev) !== -1;
      });
      console.log('this.resultatsVideos');
      console.log(this.resultatsVideos);
      this.resultatsPersonnes = this.utilisateurs.filter((u) => {
        return u.pseudo.indexOf(ev) !== -1;
      });
      console.log('this.resultatsPersonnes');
      console.log(this.resultatsPersonnes);
      this.resultatsTags = this.tags.filter((u) => {
        return u.indexOf(ev) !== -1;
      });
      console.log('this.resultatsTags');
      console.log(this.resultatsTags);
    }
  }

  getAllByTags() {
    const resultats = [];
    this.tags.forEach((tag) => {
      const videosTag = this.getVideosFrom(tag, this.videos);
      const rangee = {
        tagName: tag,
        videos: videosTag
      };
      resultats.push(rangee);
    });
    return resultats;
  }

  getVideosFrom(hashtag: string, videos: Array<Video>) {
    const resultats = [];
    videos.forEach((video) => {
      if (video.tags.indexOf(hashtag) !== -1) {
        resultats.push(video);
      }
    });
    return resultats;
  }

  focusFunction() {
    console.log('focusFunction');
    setTimeout(() => {
      this.rechercheEnCours = true;
    }, 500);
  }

  focusOutFunction() {
    console.log('focusOutFunction');
    setTimeout(() => {
      this.rechercheEnCours = false;
    }, 500);
  }

  formatTag(tag: string) {
    return tag.split('#').length > 1 ? tag.split('#')[1] : tag;
  }

  voirVideo(video: Video) {
    this.newMessage([video]);
    this.router.navigate(['tabs', 'decouvrir', 'voir-video', 'id']);
  }

  voirUtilisateur(utilisateur: Utilisateur) {
    this.router.navigate(['tabs', 'decouvrir', 'voir-utilisateur', utilisateur.id]);
  }

  voirVideosByTags(video: Video, videos: Array<Video>, tag?: string) {
    const vids = new Array<Video>();
    vids.push(video);
    videos.forEach((v) => {
      if (v.id !== video.id) {
        vids.push(v);
      }
    });
    console.log('voirVideosByTags');
    console.log(vids);
    this.newMessage(vids);
    if (tag) {
      this.router.navigate(['tabs', 'decouvrir', 'voir-video', this.formatTag(tag)]);
    } else {
      this.router.navigate(['tabs', 'decouvrir', 'voir-video', 'id']);
    }
  }

  getVideosOfTag(tag: string) {
    const videos = this.videos.filter((v) => {
      return v.tags.indexOf(tag + ' ') !== -1;
    });
    this.newMessage(videos);
    this.router.navigate(['tabs', 'decouvrir', 'voir-video', this.formatTag(tag)]);
  }

  newMessage(videos: Array<Video>) {
    this.videoService.changeMessage(videos);
  }

}
