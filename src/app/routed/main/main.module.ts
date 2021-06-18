import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePage} from './pages/home/home.page';
import {MainRoutingModule} from './main-routing.module';
import {LoginPage} from './pages/login/login.page';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {RegisterPage} from './pages/register/register.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserPage} from './pages/user/user.page';
import {RoomPage} from './pages/room/room.page';
import {VideoModule} from '../../features/video/video.module';
import {UserVideosPage} from './pages/user-videos/user-videos.page';
import {UserPlaylistsPage} from './pages/user-playlists/user-playlists.page';
import {UserFriendsPage} from './pages/user-friends/user-friends.page';
import {SettingsPage} from './pages/settings/settings.page';
import {RoomChatComponent} from './pages/room/components/room-chat/room-chat.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {SearchPage} from './pages/search/search.page';


@NgModule({
  declarations: [
    HomePage,
    LoginPage,
    RegisterPage,
    UserPage,
    RoomPage,
    UserVideosPage,
    UserPlaylistsPage,
    UserFriendsPage,
    SettingsPage,
    RoomChatComponent,
    SearchPage,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    VideoModule,
    MatListModule,
  ]
})
export class MainModule {
}
