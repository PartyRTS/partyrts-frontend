import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../user/models/user.model';
import {UserService} from '../../user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  user$: BehaviorSubject<User | undefined>;
  userId: number;

  constructor(private readonly userService: UserService) {
    this.user$ = new BehaviorSubject<User | undefined>(undefined);

    this.userId = Number(localStorage.getItem('userId'));
    if (!this.userId) {
      return;
    }
    // else load user

    this.userService.getUser(this.userId).subscribe(value => {
      this.setUser(value);
    });
  }

  setUser(user: User): void {
    this.userId = user?.idUser;
    this.user$.next(user);
  }

  getUser(): User {
    return this.user$.value;
    6;
  }
}
