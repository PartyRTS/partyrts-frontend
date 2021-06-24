import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../features/user/models/user.model';
import {AuthService} from '../../../../features/core/services/auth.service';
import {UserService} from '../../../../features/user/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Playlist} from '../../../../features/playlist/models/playlist.model';
import {UserPlaylistService} from '../../../../features/user/services/user-playlist.service';
import {MatDialog} from '@angular/material/dialog';
import {AddPlaylistDialog} from '../../../../features/playlist/components/add-playlist/add-playlist.dialog';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.page.html',
  styleUrls: ['./user-playlists.page.scss']
})
export class UserPlaylistsPage implements OnInit {
  user$: Observable<User>;
  playlists$: Observable<Playlist[]>;
  userId: number;
  currentUserId: number;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userPlaylistService: UserPlaylistService,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.currentUserId = this.authService.userId;
    this.user$ = this.userService.getUser(this.userId);
    this.playlists$ = this.userPlaylistService.getAllPlaylists(this.userId);
  }


  addPlaylist(): void {
    const dialogRef = this.dialog.open(AddPlaylistDialog, {
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.playlists$ = this.userPlaylistService.getAllPlaylists(this.userId);
    });
  }

  async onDeletePlaylist(idPlaylist: number): Promise<void> {
    await this.userPlaylistService.deletePlaylist(this.currentUserId, idPlaylist).toPromise();
    this.playlists$ = this.userPlaylistService.getAllPlaylists(this.userId);
  }
}
