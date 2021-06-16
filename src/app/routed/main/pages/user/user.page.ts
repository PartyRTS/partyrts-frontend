import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../features/user/models/user.model';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';
import {UserService} from '../../../../features/user/services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
  user$: Observable<User>;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params.id;
    this.user$ = this.userService.getUser(userId);
  }

}
