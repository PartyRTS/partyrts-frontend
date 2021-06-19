import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteUserDialog} from './components/delete-user/delete-user.dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    DeleteUserDialog
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class UserModule {
}
