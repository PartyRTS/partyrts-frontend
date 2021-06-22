import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../features/core/services/auth.service';
import {StreamService} from '../../../../features/stream/services/stream.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../../features/user/models/user.model';
import {Stream} from '../../../../features/stream/models/stream.model';
import {UserService} from '../../../../features/user/services/user.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream-page.component.html',
  styleUrls: ['./stream-page.component.scss']
})
export class StreamPage implements OnInit {

  streamId: number;
  currentUserId: number;

  stream: Stream;
  user: User;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly streamService: StreamService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.streamId = this.route.snapshot.params.id;
    this.currentUserId = this.authService.userId;

    this.streamService.getStream(this.streamId).subscribe(stream => {
      this.stream = stream;
    });

    this.userService.getUser(this.currentUserId).subscribe(user => {
      this.user = user;
    });
  }
}
