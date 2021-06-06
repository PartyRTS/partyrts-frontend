import {Component, OnInit} from '@angular/core';
import {UserVideoService} from '../../../../features/video/services/user-video.service';
import {Observable} from 'rxjs';
import {Video} from '../../../../features/video/models/video.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.page.html',
  styleUrls: ['./user-videos.page.scss']
})
export class UserVideosPage implements OnInit {

  videos$: Observable<Video[]>;
  userId: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userVideoService: UserVideoService,
  ) {
    this.userId = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.videos$ = this.userVideoService.getAllVideos(this.userId);
  }

}
