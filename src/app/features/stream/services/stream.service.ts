import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Stream} from '../models/stream.model';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {NewStream} from '../models/new-stream.model';
import {Video} from '../../video/models/video.model';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private readonly http: HttpClient) {
  }

  getAllStreams(): Observable<Stream[]> {
    return this.http.get<Stream[]>(`${environment.apiUrl}/api/v1/streams`);
  }

  addStream(newStream: NewStream): Observable<Stream> {
    return this.http.post<Stream>(`${environment.apiUrl}/api/v1/streams`, newStream);
  }

  getStream(streamId: number): Observable<Stream> {
    return this.http.get<Stream>(`${environment.apiUrl}/api/v1/streams/${streamId}`);
  }

  getVideos(streamId: number): Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.apiUrl}/api/v1/streams/${streamId}/fullPlaylist`);
  }

  getStreamsByName(search: string): Observable<Stream[]> {
    const url = new URL(`${environment.apiUrl}/api/v1/streams/search`);
    url.searchParams.append('search', search);
    return this.http.get<Stream[]>(url.toString());
  }

  addWatcher(streamId: number): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/api/v1/streams/${streamId}/addWatcher`, null);
  }

  addAuthorizedWatcher(streamId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/v1/streams/${streamId}/addWatcher/${userId}`, null);
  }
}
