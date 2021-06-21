import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {GlobalRole} from '../models/global-role.model';

@Injectable({
  providedIn: 'root'
})
export class UserGlobalRoleService {

  constructor(private readonly http: HttpClient) {
  }

  getAllGlobalRoles(userId: number): Observable<GlobalRole[]> {
    return this.http.get<GlobalRole[]>(`${environment.apiUrl}/api/v1/users/${userId}/roles`);
  }

  addGlobalRole(userId: number, globalRoleId: number): Observable<null> {
    return this.http.post<null>(`${environment.apiUrl}/api/v1/users/${userId}/roles`, globalRoleId);
  }

  deleteGlobalRole(userId: number, globalRoleId: number): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/api/v1/users/${userId}/roles/${globalRoleId}`);
  }
}
