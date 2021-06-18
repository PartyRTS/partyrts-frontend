import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {environment} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserFriendService {

  constructor(private readonly http: HttpClient) {
  }

  getAllFriends(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/v1/users/${userId}/friends`);
  }

  deleteFriend(userId: number, friendId: number): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/api/v1/users/${userId}/friends/${friendId}`);
  }
}


