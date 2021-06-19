import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Playlist} from '../models/playlist.model';
import {Video} from '../../video/models/video.model';
import {NewPlaylist} from '../models/new-playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private readonly http: HttpClient) {
  }

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(environment.apiUrl + '/api/v1/playlists');
  }

  addPlaylist(newPlaylist: NewPlaylist): Observable<Playlist> {
    return this.http.post<Playlist>(environment.apiUrl + '/api/v1/playlists', newPlaylist);
  }

  getPlaylist(playlistId: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${environment.apiUrl}/api/v1/playlists/${playlistId}`);
  }

  getVideos(playlistId: number): Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.apiUrl}/api/v1/playlists/${playlistId}/videos`);
  }

  addVideo(playlistId: number, videoId: number): Observable<null> {
    return this.http.post<null>(`${environment.apiUrl}/api/v1/playlists/${playlistId}/addVideo`, videoId);
  }
}
