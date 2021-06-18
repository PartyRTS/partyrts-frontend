import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Playlist} from '../models/playlist.model';
import {Video} from '../../video/models/video.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private readonly http: HttpClient) {
  }

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(environment.apiUrl + '/api/v1/playlists');
  }

  getPlaylist(playlistId: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${environment.apiUrl}/api/v1/playlists/${playlistId}`);
  }

  getVideos(playlistId: number): Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.apiUrl}/api/v1/playlists/${playlistId}/videos`);
  }
}
