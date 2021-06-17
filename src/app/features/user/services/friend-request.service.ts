import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  constructor(private readonly http: HttpClient) {
  }

  getAllFriendRequests(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/v1/users/${userId}/friendRequests`);
  }

  addFriendRequest(userId: number, senderId: number): Observable<null> {
    return this.http.post<null>(`${environment.apiUrl}/api/v1/users/${userId}/friendRequests/send`, {senderId});
  }

  acceptFriendRequest(userId: number, senderId: number): Observable<null> {
    return this.http.post<null>(`${environment.apiUrl}/api/v1/users/${userId}/friendRequests/accept`, {senderId});
  }

  declineFriendRequest(userId: number, senderId: number): Observable<User> {
    return this.http.post<null>(`${environment.apiUrl}/api/v1/users/${userId}/friendRequests/decline`, {senderId});
  }
}
