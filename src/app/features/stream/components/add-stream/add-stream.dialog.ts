import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {VideoCardComponent} from '../../../video/components/video-card/video-card.component';
import {Observable} from 'rxjs';
import {Playlist} from '../../../playlist/models/playlist.model';
import {PlaylistCardComponent} from '../../../playlist/components/playlist-card/playlist-card.component';
import {AuthService} from '../../../core/services/auth.service';
import {UserPlaylistService} from '../../../user/services/user-playlist.service';
import {StreamService} from '../../services/stream.service';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../user/services/user.service';
import {Category} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {StreamCategoryService} from '../../services/stream-category.service';

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.dialog.html',
  styleUrls: ['./add-stream.dialog.scss']
})
export class AddStreamDialog implements OnInit {

  @ViewChildren(VideoCardComponent) videoCardsRefs: QueryList<VideoCardComponent>;

  streamTitleForm = new FormControl('', [Validators.required]);

  playlists$: Observable<Playlist[]>;
  categories$: Observable<Category[]>;

  private currentUserId: number;

  selectedPlaylistCard: PlaylistCardComponent;
  selectedCategoriesIds: number[] = [];
  streamIsPrivateToggle = true;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userPlaylistService: UserPlaylistService,
    private readonly streamService: StreamService,
    private readonly categoryService: CategoryService,
    private readonly streamCategoryService: StreamCategoryService,
    private readonly dialogRef: MatDialogRef<AddStreamDialog>,
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.userId;
    this.playlists$ = this.userPlaylistService.getAllPlaylists(this.currentUserId);
    this.categories$ = this.categoryService.getAllCategories();
  }

  select(videoElement: PlaylistCardComponent): void {
    this.selectedPlaylistCard?.toggle();
    videoElement.toggle();
    this.selectedPlaylistCard = videoElement;
  }

  buttonEnabled(): boolean {
    if (this.selectedCategoriesIds.length === 0) {
      return false;
    }
    if (!this.selectedPlaylistCard) {
      return false;
    }
    return this.streamTitleForm.valid;
  }

  async addStream(): Promise<void> {
    const streamTitle = this.streamTitleForm.value;
    const idPlaylist = this.selectedPlaylistCard?.playlistId;
    const privateStream = this.streamIsPrivateToggle;
    const stream = await this.streamService.addStream({streamTitle, idUser: this.currentUserId, idPlaylist, privateStream}).toPromise();

    console.log(this.selectedCategoriesIds);
    await this.streamCategoryService.addCategories(stream.idStream, this.selectedCategoriesIds).toPromise();
    this.dialogRef.close();
  }
}
