import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddStreamDialog} from './components/add-stream/add-stream.dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {VideoModule} from '../video/video.module';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {RouterModule} from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    AddStreamDialog
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
    FormsModule,
    VideoModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatListModule,
  ]
})
export class StreamModule {
}
