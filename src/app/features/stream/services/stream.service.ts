import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Stream} from '../models/stream.model';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private readonly http: HttpClient) {
  }

  getAllUsers(): Observable<Stream[]> {
    return this.http.get<Stream[]>(environment.apiUrl + '/api/v1/streams');
  }
}
