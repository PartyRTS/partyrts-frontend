import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Vote} from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class StreamVoteService {

  constructor(private readonly http: HttpClient) {
  }

  getActiveVote(streamId: number): Observable<Vote> {
    return this.http.get<Vote>(`${environment.apiUrl}/api/v1/streams/${streamId}/activeVote`);
  }


  // Todo

  // addVoteAdd(streamId: number, newMessage: NewVoteAdd): Observable<void> {
  //   return this.http.post<void>(`${environment.apiUrl}/api/v1/streams/${streamId}/messages`, newMessage);
  // }
  //
  // addVoteSkip(streamId: number, newMessage: NewVoteSkip): Observable<void> {
  //   return this.http.post<void>(`${environment.apiUrl}/api/v1/streams/${streamId}/messages`, newMessage);
  // }
}
