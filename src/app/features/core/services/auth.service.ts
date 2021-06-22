import {Injectable} from '@angular/core';
import {UserService} from '../../user/services/user.service';
import {LoginRequest} from '../models/login-request.model';
import {AuthResponse} from '../models/auth-response.model';
import {environment} from '../../../../environments/environment';
import {NewUser} from '../../user/models/new-user.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {myRxStompConfig} from '../config/my-rx-stomp.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId: number;
  token: string;

  authorized$: BehaviorSubject<boolean>;

  constructor(
    private readonly userService: UserService,
    private readonly http: HttpClient,
    private readonly rxStompService: RxStompService,
  ) {
    this.userId = Number(localStorage.getItem('userId'));
    this.token = localStorage.getItem('token');
    this.authorized$ = new BehaviorSubject<boolean>(this.userId !== null);
    this.refreshWs();
  }

  async login(loginRequest: LoginRequest): Promise<void> {
    const authRequest = await this.http.post<AuthResponse>(`${environment.apiUrl}/api/v1/public/auth/login`, loginRequest).toPromise();
    this.setToken(authRequest.token);
    this.setUserId(authRequest.userId);
    this.authorized$.next(true);
    await this.refreshWs();
  }

  async register(newUser: NewUser): Promise<void> {
    const authRequest = await this.http.post<AuthResponse>(`${environment.apiUrl}/api/v1/public/auth/register`, newUser).toPromise();
    this.setToken(authRequest.token);
    this.setUserId(authRequest.userId);
    this.authorized$.next(true);
    await this.refreshWs();
  }

  async logout(): Promise<void> {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.authorized$.next(false);
    await this.refreshWs();
  }


  async refreshWs(): Promise<void> {
    const token = this.token;
    if (token) {
      console.log(`recreate stomp connection with token: ${token}`);
      this.recreateWsWithToken(token);
    } else {
      console.log(`close stomp connection`);
      await this.disposeWs();
    }
  }

  recreateWsWithToken(token: string): void {
    const stompConfig: InjectableRxStompConfig = Object.assign({}, myRxStompConfig, {
      connectHeaders: {
        token,
      },
    });
    this.rxStompService.configure(stompConfig);
    this.rxStompService.activate();
  }

  async disposeWs(): Promise<void> {
    await this.rxStompService.deactivate();
  }


  setUserId(userId: number): void {
    console.log('save userId' + userId);
    this.userId = userId;
    localStorage.setItem('userId', String(userId));
  }

  setToken(token: string): void {
    console.log('save token' + token);
    this.token = token;
    localStorage.setItem('token', token);
  }
}
