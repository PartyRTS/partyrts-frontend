import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VideoCardComponent} from './components/video-card/video-card.component';
import {PlaylistCardComponent} from '../playlist/components/playlist-card/playlist-card.component';
import {StreamCardComponent} from '../stream/components/stream-card/stream-card.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {DeletableVideoCardComponent} from './components/deletable-video-card/deletable-video-card.component';
import {AddVideoDialog} from './add-video/add-video.dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    VideoCardComponent,
    PlaylistCardComponent,
    StreamCardComponent,
    DeletableVideoCardComponent,
    AddVideoDialog
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
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class VideoModule {
}
