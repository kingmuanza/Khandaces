import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  visible = true;
  visibleSubject = new Subject<boolean>();

  videoEnLecture: Video;
  videoEnLectureSubject = new Subject<Video>();

  translucide = true;
  translucideSubject = new Subject<boolean>();

  commentaires = [];
  voirCommentaires = false;
  commentairesSubject = new Subject<boolean>();

  constructor() { }

  emit() {
    this.visibleSubject.next(this.visible);
    this.commentairesSubject.next(this.voirCommentaires);
    this.videoEnLectureSubject.next(this.videoEnLecture);
    this.translucideSubject.next(this.translucide);
  }
}
