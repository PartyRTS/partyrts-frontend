import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Video} from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private readonly http: HttpClient) {
  }

  getAllVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.apiUrl}/api/v1/videos`);
  }

  getVideo(videoId: number): Observable<Video> {
    return this.http.get<Video>(`${environment.apiUrl}/api/v1/videos/${videoId}`);
  }
}
