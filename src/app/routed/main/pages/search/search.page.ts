import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../features/user/models/user.model';
import {UserService} from '../../../../features/user/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../../../../features/core/services/search.service';
import {StreamService} from '../../../../features/stream/services/stream.service';
import {Stream} from '../../../../features/stream/models/stream.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  users$: Observable<User[]>;
  streams$: Observable<Stream[]>;

  constructor(
    private readonly userService: UserService,
    private readonly streamService: StreamService,
    private readonly route: ActivatedRoute,
    private readonly searchService: SearchService,
  ) {
  }

  ngOnInit(): void {
    this.searchService.search$.subscribe(value => {
      this.users$ = this.userService.getUsersByName(value);
      this.streams$ = this.streamService.getStreamsByName(value);
    });
  }

}
