import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../features/user/models/user.model';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';
import {UserService} from '../../../../features/user/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {FriendRequestService} from '../../../../features/user/services/friend-request.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
  user$: Observable<User>;
  userId: number;
  currentUserId: number;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly friendRequestService: FriendRequestService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.currentUserService.user$.subscribe(currentUser => {
      this.currentUserId = currentUser?.idUser;
    });
    this.user$ = this.userService.getUser(this.userId);
  }

  addToFriend(): void {
    this.friendRequestService.addFriendRequest(this.userId, this.currentUserId).subscribe();
  }
}
