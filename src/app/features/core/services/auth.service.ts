import {Injectable} from '@angular/core';
import {LoginRequest} from '../models/login-request.model';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CurrentUserService} from './current-user.service';
import {User} from '../../user/models/user.model';
import {UserService} from '../../user/services/user.service';
import {NewUser} from '../../user/models/new-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User | undefined;

  constructor(
    private readonly userService: UserService,
    private readonly currentUserService: CurrentUserService,
  ) {
  }

  static saveUserInStorage(u: User): void {
    localStorage.setItem('userId', String(u.idUser));
  }

  login(loginRequest: LoginRequest): Observable<User | undefined> {
    return this.userService.login(loginRequest).pipe(
      tap(u => {
        AuthService.saveUserInStorage(u);
        this.currentUserService.setUser(u);
      })
    );
  }

  register(newUser: NewUser): Observable<User | undefined> {
    return this.userService.register(newUser).pipe(
      tap(u => {
        AuthService.saveUserInStorage(u);
        this.currentUserService.setUser(u);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.currentUserService.setUser(undefined);
  }


}
