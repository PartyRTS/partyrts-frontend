import {Component, OnInit} from '@angular/core';
import {Stream} from '../../../../features/stream/models/stream.model';
import {StreamService} from '../../../../features/stream/services/stream.service';
import {AuthService} from '../../../../features/core/services/auth.service';

import {User} from '../../../../features/user/models/user.model';
import {Category} from '../../../../features/stream/models/category.model';
import {CategoryService} from '../../../../features/stream/services/category.service';
import {UserFriendService} from '../../../../features/user/services/user-friend.service';
import {UserService} from '../../../../features/user/services/user.service';
import {UserStreamService} from '../../../../features/user/services/user-stream.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  popularActiveStreams: Stream[];
  friendActiveStreams: Stream[];
  user: User;
  friends: User[];
  categories: Category[];

  currentUserId: number;

  constructor(
    private readonly streamService: StreamService,
    private readonly categoryService: CategoryService,
    private readonly userFriendService: UserFriendService,
    private readonly userStreamService: UserStreamService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.currentUserId = this.authService.userId;
    if (this.currentUserId) {
      this.user = await this.userService.getUser(this.currentUserId).toPromise();
      this.friends = await this.userFriendService.getAllFriends(this.currentUserId).toPromise();

      const friendActiveStreams = [];

      for (const friend of this.friends) {
        const stream = await this.userStreamService.getActiveStream(friend.idUser).toPromise();
        if (stream?.activeStream) {
          friendActiveStreams.push(stream);
        }
      }
      this.friendActiveStreams = friendActiveStreams;
    }
    this.categories = await this.categoryService.getAllCategories().toPromise();

    const streams = await this.streamService.getAllStreams().toPromise();
    this.popularActiveStreams = streams
      .filter(stream => stream.activeStream)
      .sort((a, b) => a.fullUsers > b.fullUsers ? -1 : 1);


  }

}

