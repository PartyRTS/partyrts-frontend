import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {NewUser} from '../models/new-user.model';
import {LoginRequest} from '../models/login-request.model';
import {UpdateUser} from '../models/update-user.model';
import {UpdatePasswordRequest} from '../models/update-password-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/api/v1/users');
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `/api/v1/users/${userId}`);
  }

  updateUser(userId: number, updateUser: UpdateUser): Observable<null> {
    return this.http.put<null>(environment.apiUrl + `/api/v1/users/${userId}`, updateUser);
  }

  deleteUser(userId: number): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/api/v1/users/${userId}`);
  }

  updateUserPassword(userId: number, updatePasswordRequest: UpdatePasswordRequest): Observable<null> {
    return this.http.put<null>(environment.apiUrl + `/api/v1/users/${userId}/password`, updatePasswordRequest);
  }

  getAllFriends(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/v1/users/${userId}/friends`);
  }

  deleteFriend(userId: number, friendId: number): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/api/v1/users/${userId}/friends/${friendId}`);
  }

  login(loginRequest: LoginRequest): Observable<User> {
    return this.http.post<User>(environment.apiUrl + `/api/v1/users/login`, loginRequest);
  }

  register(newUser: NewUser): Observable<User> {
    return this.http.post<User>(environment.apiUrl + `/api/v1/users/register`, newUser);
  }
}
