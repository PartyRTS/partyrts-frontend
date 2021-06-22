import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../../user/services/user.service';
import {UserVideoService} from '../../../user/services/user-video.service';
import {Observable} from 'rxjs';
import {Video} from '../../../video/models/video.model';
import {VideoCardComponent} from '../../../video/components/video-card/video-card.component';
import {FormControl, Validators} from '@angular/forms';
import {PlaylistService} from '../../services/playlist.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.dialog.html',
  styleUrls: ['./add-playlist.dialog.scss']
})
export class AddPlaylistDialog implements OnInit {

  playlistTitleForm = new FormControl('', [Validators.required]);

  @ViewChildren(VideoCardComponent) videoCardsRefs: QueryList<VideoCardComponent>;

  $videos: Observable<Video[]>;
  private currentUserId: number;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userVideoService: UserVideoService,
    private readonly playlistService: PlaylistService,
    private readonly dialogRef: MatDialogRef<AddPlaylistDialog>,
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.userId;
    this.$videos = this.userVideoService.getAllVideos(this.currentUserId);
  }

  select(videoElement: VideoCardComponent): void {
    videoElement.toggle();
  }

  async create(): Promise<void> {
    const title = this.playlistTitleForm.value;
    const playlist = await this.playlistService.addPlaylist({title, idUser: this.currentUserId}).toPromise();

    for (const videoId of this.videoCardsRefs
      .filter(item => item.selected)
      .map(video => video.videoId)) {
      await this.playlistService.addVideo(playlist.idPlaylist, videoId).toPromise();
    }
    this.dialogRef.close();
  }
}
