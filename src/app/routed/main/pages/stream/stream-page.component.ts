import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';
import {StreamService} from '../../../../features/stream/services/stream.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-stream',
  templateUrl: './stream-page.component.html',
  styleUrls: ['./stream-page.component.scss']
})
export class StreamPage implements OnInit {

  streamId: number;
  currentUserId: number;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly streamService: StreamService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.streamId = this.route.snapshot.params.id;
    this.currentUserId = this.currentUserService.userId;
  }
}
