import {Component, OnInit} from '@angular/core';
import {UserVideoService} from '../../../../features/user/services/user-video.service';
import {Observable} from 'rxjs';
import {Video} from '../../../../features/video/models/video.model';
import {ActivatedRoute} from '@angular/router';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';
import {UserService} from '../../../../features/user/services/user.service';
import {User} from '../../../../features/user/models/user.model';

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.page.html',
  styleUrls: ['./user-videos.page.scss']
})
export class UserVideosPage implements OnInit {
  user$: Observable<User>;
  videos$: Observable<Video[]>;
  userId: number;
  currentUserId: number;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly userVideoService: UserVideoService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.currentUserId = this.currentUserService.userId;
    this.user$ = this.userService.getUser(this.userId);
    this.videos$ = this.userVideoService.getAllVideos(this.userId);
  }

}
