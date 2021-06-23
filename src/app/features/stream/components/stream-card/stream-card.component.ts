import {Component, Input, OnInit} from '@angular/core';
import {StreamService} from '../../services/stream.service';
import {Stream} from '../../models/stream.model';
import {User} from '../../../user/models/user.model';
import {UserService} from '../../../user/services/user.service';
import {Video} from '../../../video/models/video.model';

@Component({
  selector: 'app-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.scss']
})
export class StreamCardComponent implements OnInit {

  @Input()
  streamId: number;

  stream: Stream;
  creator: User;
  currentVideo: Video;

  constructor(
    private readonly streamService: StreamService,
    private readonly userService: UserService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.stream = await this.streamService.getStream(this.streamId).toPromise();
    this.creator = await this.userService.getUser(this.stream.idUser).toPromise();
    const videos = await this.streamService.getVideos(this.streamId).toPromise();
    this.currentVideo = videos[this.stream.currentNumberVideo];
    console.log(this.currentVideo);
  }

}
