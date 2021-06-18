import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../features/user/models/user.model';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';
import {UserService} from '../../../../features/user/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Playlist} from '../../../../features/playlist/models/playlist.model';
import {UserPlaylistService} from '../../../../features/user/services/user-playlist.service';

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
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly userPlaylistService: UserPlaylistService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.currentUserId = this.currentUserService.userId;
    this.user$ = this.userService.getUser(this.userId);
    this.playlists$ = this.userPlaylistService.getAllPlaylists(this.userId);
  }


}
