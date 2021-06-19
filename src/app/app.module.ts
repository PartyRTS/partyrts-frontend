import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './features/core/core.module';
import {MainModule} from './routed/main/main.module';
import {UserModule} from './features/user/user.module';
import {VideoModule} from './features/video/video.module';
import {PlaylistModule} from './features/playlist/playlist.module';
import {StreamModule} from './features/stream/stream.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    MainModule,
    UserModule,
    VideoModule,
    PlaylistModule,
    StreamModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
