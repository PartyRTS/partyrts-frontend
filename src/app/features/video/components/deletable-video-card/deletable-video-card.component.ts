import {Component, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Video} from '../../models/video.model';
import {User} from '../../../user/models/user.model';
import {VideoService} from '../../services/video.service';
import {UserService} from '../../../user/services/user.service';

@Component({
  selector: 'app-deletable-video-card',
  templateUrl: './deletable-video-card.component.html',
  styleUrls: ['./deletable-video-card.component.scss']
})
export class DeletableVideoCardComponent implements OnInit {

  @Input()
  videoId: number;

  @Input()
  selected = false;

  @Output()
  deleteEvent: Subject<void> = new Subject<void>();

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

  onDeleteButtonClick(): void {
    this.deleteEvent.next();
  }
}
