import {Component, OnInit} from '@angular/core';
import {User} from '../../../../features/user/models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';
import {UserFriendRequestService} from '../../../../features/user/services/user-friend-request.service';
import {UserService} from '../../../../features/user/services/user.service';
import {UserFriendService} from '../../../../features/user/services/user-friend.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.page.html',
  styleUrls: ['./user-friends.page.scss']
})
export class UserFriendsPage implements OnInit {
  user$: BehaviorSubject<User | undefined>;
  subscribers$: Observable<User[]>;
  friends$: Observable<User[]>;
  currentUserId: number;

  constructor(
    readonly currentUserService: CurrentUserService,
    readonly friendRequestService: UserFriendRequestService,
    readonly userService: UserService,
    readonly userFriendService: UserFriendService,
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.currentUserService.user$;
    this.currentUserId = this.currentUserService.userId;
    this.subscribers$ = this.friendRequestService.getAllFriendRequests(this.currentUserId);
    this.friends$ = this.userFriendService.getAllFriends(this.currentUserId);
  }

  acceptFriendRequest(userId: number): void {
    this.friendRequestService.acceptFriendRequest(userId, this.currentUserId).subscribe(() => {
      this.subscribers$ = this.friendRequestService.getAllFriendRequests(this.currentUserId);
      this.friends$ = this.userFriendService.getAllFriends(this.currentUserId);
    });
  }

  declineFriendRequest(userId: number): void {
    this.friendRequestService.declineFriendRequest(userId, this.currentUserId).subscribe(() => {
      this.subscribers$ = this.friendRequestService.getAllFriendRequests(this.currentUserId);
      this.friends$ = this.userFriendService.getAllFriends(this.currentUserId);
    });
  }

  deleteFriend(friendId: number): void {
    this.userFriendService.deleteFriend(this.currentUserId, friendId).subscribe(() => {
      this.subscribers$ = this.friendRequestService.getAllFriendRequests(this.currentUserId);
      this.friends$ = this.userFriendService.getAllFriends(this.currentUserId);
    });
  }
}
