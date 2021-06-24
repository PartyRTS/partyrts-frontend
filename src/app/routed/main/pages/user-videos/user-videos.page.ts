import {Component, OnInit} from '@angular/core';
import {UserVideoService} from '../../../../features/user/services/user-video.service';
import {Observable} from 'rxjs';
import {Video} from '../../../../features/video/models/video.model';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../features/core/services/auth.service';
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
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userVideoService: UserVideoService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.currentUserId = this.authService.userId;
    this.user$ = this.userService.getUser(this.userId);
    this.videos$ = this.userVideoService.getAllVideos(this.userId);
  }

  async onDeleteVideo(idVideo: number): Promise<void> {
    await this.userVideoService.deleteVideo(this.currentUserId, idVideo).toPromise();
    this.videos$ = this.userVideoService.getAllVideos(this.userId);
  }
}
