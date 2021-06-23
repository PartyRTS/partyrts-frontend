import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {NewUserVote} from '../models/new-user-vote.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private readonly http: HttpClient) {
  }

  addUserVote(voteId: number, newUserVote: NewUserVote): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/v1/vote/${voteId}/addUserVote`, newUserVote);
  }
}
