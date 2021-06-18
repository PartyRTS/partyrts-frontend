import {Component, Input, OnInit} from '@angular/core';
import {StreamService} from '../../services/stream.service';
import {Stream} from '../../models/stream.model';
import {Observable} from 'rxjs';
import {User} from '../../../user/models/user.model';
import {UserService} from '../../../user/services/user.service';

@Component({
  selector: 'app-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.scss']
})
export class StreamCardComponent implements OnInit {

  @Input()
  streamId: number;

  stream$: Observable<Stream>;
  creator$: Observable<User>;

  constructor(
    private readonly streamService: StreamService,
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.stream$ = this.streamService.getStream(this.streamId);
    this.stream$.subscribe(stream => {
      this.creator$ = this.userService.getUser(stream.idUser);
    });
  }

}
