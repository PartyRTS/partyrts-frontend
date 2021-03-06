import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home/home.page';
import {LoginPage} from './pages/login/login.page';
import {RegisterPage} from './pages/register/register.page';
import {UserPage} from './pages/user/user.page';
import {StreamPage} from './pages/stream/stream-page.component';
import {UserVideosPage} from './pages/user-videos/user-videos.page';
import {UserPlaylistsPage} from './pages/user-playlists/user-playlists.page';
import {UserFriendsPage} from './pages/user-friends/user-friends.page';
import {SettingsPage} from './pages/settings/settings.page';
import {SearchPage} from './pages/search/search.page';
import {SearchByCategoryPage} from './pages/search-by-category/search-by-category.page';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'prefix'},
  {path: 'home', component: HomePage},
  {path: 'login', component: LoginPage},
  {path: 'register', component: RegisterPage},
  {path: 'friends', component: UserFriendsPage},
  {path: 'settings', component: SettingsPage},
  {path: 'search', component: SearchPage},
  {path: 'users/:id', component: UserPage},
  {path: 'users/:id/videos', component: UserVideosPage},
  {path: 'users/:id/playlists', component: UserPlaylistsPage},
  {path: 'streams/:id', component: StreamPage},
  {path: 'search-by-category', component: SearchByCategoryPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
