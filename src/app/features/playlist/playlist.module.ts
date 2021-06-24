import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddPlaylistDialog} from './components/add-playlist/add-playlist.dialog';
import {VideoModule} from '../video/video.module';
import {DeletablePlaylistCardComponent} from './components/deletable-stream-card/deletable-playlist-card.component';


@NgModule({
  declarations: [
    AddPlaylistDialog,
    DeletablePlaylistCardComponent,
  ],
  exports: [
    DeletablePlaylistCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    VideoModule,
  ]
})
export class PlaylistModule {
}
