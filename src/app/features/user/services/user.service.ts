import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
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

  updateUser(userId: number, updateUser: UpdateUser): Observable<void> {
    return this.http.put<void>(environment.apiUrl + `/api/v1/users/${userId}`, updateUser);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/v1/users/${userId}`);
  }

  getUsersByName(search: string): Observable<User[]> {
    const url = new URL(`${environment.apiUrl}/api/v1/users/search`);
    url.searchParams.append('search', search);
    return this.http.get<User[]>(url.toString());
  }

  updateUserPassword(userId: number, updatePasswordRequest: UpdatePasswordRequest): Observable<void> {
    return this.http.put<void>(environment.apiUrl + ` / api / v1 / users /${userId}/password`, updatePasswordRequest);
  }

  setBanned(userId: number, banned: boolean): Observable<void> {
    return this.http.put<void>(environment.apiUrl + `/api/v1/users/${userId}/ban`, banned);
  }
}
