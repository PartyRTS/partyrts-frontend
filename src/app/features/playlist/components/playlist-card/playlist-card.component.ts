import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {VideoService} from '../../../video/services/video.service';
import {PlaylistService} from '../../services/playlist.service';
import {Playlist} from '../../models/playlist.model';
import {UserService} from '../../../user/services/user.service';
import {User} from '../../../user/models/user.model';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent implements OnInit {

  @Input()
  playlistId;

  playlist$: Observable<Playlist>;
  owner$: Observable<User>;

  previewUrl: string;

  constructor(
    private readonly playlistService: PlaylistService,
    private readonly videoService: VideoService,
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.playlist$ = this.playlistService.getPlaylist(this.playlistId);
    this.playlist$.subscribe(playlist => {
      this.owner$ = this.userService.getUser(playlist.idUser);
      this.playlistService.getVideos(playlist.idPlaylist).subscribe(videos => {
        if (videos.length > 0) {
          this.previewUrl = videos[0].previewUrl;
        }
      });
    });
  }


}
