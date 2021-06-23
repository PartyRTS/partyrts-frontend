import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Vote} from '../models/vote.model';
import {NewVoteAdd} from '../models/new-vote-add.model';
import {NewVoteSkip} from '../models/new-vote-skip.model';

@Injectable({
  providedIn: 'root'
})
export class StreamVoteService {

  constructor(private readonly http: HttpClient) {
  }

  getActiveVote(streamId: number): Observable<Vote> {
    return this.http.get<Vote>(`${environment.apiUrl}/api/v1/streams/${streamId}/activeVote`);
  }

  addVoteAdd(streamId: number, newVoteAdd: NewVoteAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/v1/streams/${streamId}/addVoteAdd`, newVoteAdd);
  }

  addVoteSkip(streamId: number, newVoteSkip: NewVoteSkip): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/v1/streams/${streamId}/addSkipVote`, newVoteSkip);
  }
}
