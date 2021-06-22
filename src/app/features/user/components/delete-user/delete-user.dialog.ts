import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.dialog.html',
  styleUrls: ['./delete-user.dialog.scss']
})
export class DeleteUserDialog implements OnInit {

  constructor(
    private readonly dialog: MatDialogRef<DeleteUserDialog>,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  deleteUser(): void {
    const userId = this.authService.userId;
    this.userService.deleteUser(userId).subscribe();
    this.authService.logout();
    this.router.navigate(['/']);
    this.dialog.close();
  }

}
