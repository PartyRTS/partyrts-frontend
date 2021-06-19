import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CurrentUserService} from '../../../core/services/current-user.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.dialog.html',
  styleUrls: ['./delete-user.dialog.scss']
})
export class DeleteUserDialog implements OnInit {

  constructor(
    private readonly dialog: MatDialogRef<DeleteUserDialog>,
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  deleteUser(): void {
    const userId = this.currentUserService.userId;
    this.userService.deleteUser(userId).subscribe();
    this.authService.logout();
    this.router.navigate(['/']);
    this.dialog.close();

  }

}
