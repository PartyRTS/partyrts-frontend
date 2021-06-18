import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home/home.page';
import {LoginPage} from './pages/login/login.page';
import {RegisterPage} from './pages/register/register.page';
import {UserPage} from './pages/user/user.page';
import {RoomPage} from './pages/room/room.page';
import {UserVideosPage} from './pages/user-videos/user-videos.page';
import {UserPlaylistsPage} from './pages/user-playlists/user-playlists.page';
import {UserFriendsPage} from './pages/user-friends/user-friends.page';
import {SettingsPage} from './pages/settings/settings.page';
import {SearchPage} from './pages/search/search.page';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'prefix'},
  {path: 'home', component: HomePage},
  {path: 'login', component: LoginPage},
  {path: 'register', component: RegisterPage},
  {path: 'users/:id', component: UserPage},
  {path: 'users/:id/videos', component: UserVideosPage},
  {path: 'users/:id/playlists', component: UserPlaylistsPage},
  {path: 'friends', component: UserFriendsPage},
  {path: 'settings', component: SettingsPage},
  {path: 'rooms/:id', component: RoomPage},
  {path: 'search', component: SearchPage},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
