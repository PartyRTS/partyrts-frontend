import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {VideoCardComponent} from '../../../video/components/video-card/video-card.component';
import {Observable} from 'rxjs';
import {Playlist} from '../../../playlist/models/playlist.model';
import {PlaylistCardComponent} from '../../../playlist/components/playlist-card/playlist-card.component';
import {CurrentUserService} from '../../../core/services/current-user.service';
import {UserPlaylistService} from '../../../user/services/user-playlist.service';
import {StreamService} from '../../services/stream.service';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../user/services/user.service';
import {Category} from '../../models/category.model';

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.dialog.html',
  styleUrls: ['./add-stream.dialog.scss']
})
export class AddStreamDialog implements OnInit {

  streamTitleForm = new FormControl('', [Validators.required]);

  @ViewChildren(VideoCardComponent) videoCardsRefs: QueryList<VideoCardComponent>;

  $playlists: Observable<Playlist[]>;
  categories: Category[] = [
    {title: 'good', idCategory: 1},
    {title: 'bad', idCategory: 2},
  ];
  selectedCategories: Category[] = [];
  private currentUserId: number;
  private selectedPlaylistCard: PlaylistCardComponent;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly userPlaylistService: UserPlaylistService,
    private readonly streamService: StreamService,
    private readonly dialogRef: MatDialogRef<AddStreamDialog>,
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = this.currentUserService.userId;
    this.$playlists = this.userPlaylistService.getAllPlaylists(this.currentUserId);
  }

  search(value: string): void {

  }

  select(videoElement: PlaylistCardComponent): void {
    this.selectedPlaylistCard?.toggle();
    videoElement.toggle();
    this.selectedPlaylistCard = videoElement;
  }

  async create(): Promise<void> {
    const streamTitle = this.streamTitleForm.value;
    const idPlaylist = this.selectedPlaylistCard?.playlistId;
    const stream = await this.streamService.addStream({streamTitle, idUser: this.currentUserId, idPlaylist}).toPromise();
    this.dialogRef.close();
  }
}
