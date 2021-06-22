import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Stream} from '../../../../features/stream/models/stream.model';
import {StreamService} from '../../../../features/stream/services/stream.service';
import {AuthService} from '../../../../features/core/services/auth.service';

import {User} from '../../../../features/user/models/user.model';
import {Category} from '../../../../features/stream/models/category.model';
import {CategoryService} from '../../../../features/stream/services/category.service';
import {UserFriendService} from '../../../../features/user/services/user-friend.service';
import {UserService} from '../../../../features/user/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  streams$: Observable<Stream[]>;
  user$: Observable<User>;
  friends$: Observable<User[]>;
  categories$: Observable<Category[]>;

  currentUserId: number;

  constructor(
    private readonly streamService: StreamService,
    private readonly categoryService: CategoryService,
    private readonly userFriendService: UserFriendService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.userId;
    if (this.currentUserId) {
      // FIXME
      this.user$ = this.userService.getUser(this.currentUserId);
      this.friends$ = this.userFriendService.getAllFriends(this.currentUserId);
    }
    this.categories$ = this.categoryService.getAllCategories();
    this.streams$ = this.streamService.getAllStreams();
  }

}

