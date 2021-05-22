import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VideoCardComponent} from './components/video-card/video-card.component';
import {PlaylistCardComponent} from './components/playlist-card/playlist-card.component';
import {StreamCardComponent} from './components/stream-card/stream-card.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    VideoCardComponent,
    PlaylistCardComponent,
    StreamCardComponent
  ],
  exports: [
    VideoCardComponent,
    PlaylistCardComponent,
    StreamCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
  ]
})
export class VideoModule {
}
