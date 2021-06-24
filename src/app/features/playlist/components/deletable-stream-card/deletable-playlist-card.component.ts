import {Component, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Playlist} from '../../models/playlist.model';
import {User} from '../../../user/models/user.model';
import {PlaylistService} from '../../services/playlist.service';
import {VideoService} from '../../../video/services/video.service';
import {UserService} from '../../../user/services/user.service';

@Component({
  selector: 'app-deletable-stream-card',
  templateUrl: './deletable-playlist-card.component.html',
  styleUrls: ['./deletable-playlist-card.component.scss']
})
export class DeletablePlaylistCardComponent implements OnInit {

  @Input()
  playlistId;
  @Input()
  selected = false;
  @Output()
  deleteEvent: Subject<void> = new Subject<void>();

  playlist$: Observable<Playlist>;
  owner$: Observable<User>;

  @HostBinding('style.border') border;

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
