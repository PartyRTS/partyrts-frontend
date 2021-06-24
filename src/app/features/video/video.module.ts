import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VideoCardComponent} from './components/video-card/video-card.component';
import {PlaylistCardComponent} from '../playlist/components/playlist-card/playlist-card.component';
import {StreamCardComponent} from '../stream/components/stream-card/stream-card.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {DeletableVideoCardComponent} from './components/deletable-video-card/deletable-video-card.component';


@NgModule({
  declarations: [
    VideoCardComponent,
    PlaylistCardComponent,
    StreamCardComponent,
    DeletableVideoCardComponent
  ],
  exports: [
    VideoCardComponent,
    PlaylistCardComponent,
    StreamCardComponent,
    DeletableVideoCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
  ]
})
export class VideoModule {
}
