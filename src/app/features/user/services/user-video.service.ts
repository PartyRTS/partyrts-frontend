import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Video} from '../../video/models/video.model';

@Injectable({
  providedIn: 'root'
})
export class UserVideoService {

  constructor(private readonly http: HttpClient) {
  }

  getAllVideos(userId: number): Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.apiUrl}/api/v1/users/${userId}/videos`);
  }

  deleteVideo(userId: number, videoId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/v1/users/${userId}/videos/${videoId}`);
  }
}
