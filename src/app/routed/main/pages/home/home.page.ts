import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Stream} from '../../../../features/stream/models/stream.model';
import {StreamService} from '../../../../features/stream/services/stream.service';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';

import {User} from '../../../../features/user/models/user.model';
import {Category} from '../../../../features/stream/models/category.model';
import {CategoryService} from '../../../../features/stream/services/category.service';
import {UserFriendService} from '../../../../features/user/services/user-friend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  streams$: Observable<Stream[]>;
  user$: BehaviorSubject<User | undefined>;
  friends$: Observable<User[]>;
  categories$: Observable<Category[]>;

  currentUserId: number;

  constructor(
    private readonly streamService: StreamService,
    private readonly categoryService: CategoryService,
    private readonly userFriendService: UserFriendService,
    private readonly currentUserService: CurrentUserService,
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = this.currentUserService.userId;

    this.categories$ = this.categoryService.getAllCategories();
    this.streams$ = this.streamService.getAllStreams();
    this.user$ = this.currentUserService.user$;
    this.friends$ = this.userFriendService.getAllFriends(this.currentUserId);
  }

}

