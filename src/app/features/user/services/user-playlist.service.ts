import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Playlist} from '../../playlist/models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class UserPlaylistService {

  constructor(private readonly http: HttpClient) {
  }

  getAllPlaylists(userId: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${environment.apiUrl}/api/v1/users/${userId}/playlists`);
  }

  deletePlaylist(userId: number, playlistId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/v1/users/${userId}/playlists/${playlistId}`);
  }
}
