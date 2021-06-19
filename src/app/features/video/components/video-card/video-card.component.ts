import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {VideoService} from '../../services/video.service';
import {Observable} from 'rxjs';
import {Video} from '../../models/video.model';
import {User} from '../../../user/models/user.model';
import {UserService} from '../../../user/services/user.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

  @Input()
  videoId: number;

  @Input()
  selected = false;

  @HostBinding('style.border') border;

  video$: Observable<Video>;
  creator$: Observable<User>;

  constructor(
    private readonly videoService: VideoService,
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.video$ = this.videoService.getVideo(this.videoId);
    this.video$.subscribe(value => {
      this.creator$ = this.userService.getUser(value.idUser);
    });
  }

  toggle(): boolean {

    this.selected = !this.selected;

    if (this.selected) {
      this.border = '1px solid blue';
    } else {
      this.border = undefined;
    }

    return this.selected;
  }

}
