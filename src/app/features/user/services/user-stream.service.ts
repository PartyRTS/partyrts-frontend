import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Stream} from '../../stream/models/stream.model';

@Injectable({
  providedIn: 'root'
})
export class UserStreamService {

  constructor(private readonly http: HttpClient) {
  }

  getAllStreams(userId: number): Observable<Stream[]> {
    return this.http.get<Stream[]>(`${environment.apiUrl}/api/v1/users/${userId}/streams`);
  }
}
