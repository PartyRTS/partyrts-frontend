import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Stream} from '../../../../features/stream/models/stream.model';
import {StreamService} from '../../../../features/stream/services/stream.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  streams$: Observable<Stream[]>;

  constructor(
    private readonly streamService: StreamService,
  ) {
  }

  ngOnInit(): void {
    this.streams$ = this.streamService.getAllUsers();
  }

}
