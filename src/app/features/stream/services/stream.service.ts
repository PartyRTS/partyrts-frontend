import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Stream} from '../models/stream.model';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private readonly http: HttpClient) {
  }

  getAllStreams(): Observable<Stream[]> {
    return this.http.get<Stream[]>(`${environment.apiUrl}/api/v1/streams`);
  }
}
