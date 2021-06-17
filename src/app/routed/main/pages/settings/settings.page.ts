import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../../../features/user/models/user.model';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../features/user/services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../features/core/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {

  user$: BehaviorSubject<User | undefined>;
  infoForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.infoForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      secondName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.email]),
      birthdayDate: new FormControl('', [Validators.required, Validators.email]),
    });

    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.user$ = this.currentUserService.user$;

    this.user$.subscribe(value => {
      if (!value) {
        return;
      }
      this.infoForm.setValue({
        firstName: value.firstName,
        secondName: value.secondName,
        email: value.email,
        description: value.description,
        birthdayDate: value.birthdayDate,
      });
    });
  }


  saveInfo(): void {
    const userId = this.currentUserService.userId;
    this.userService.updateUser(userId, this.infoForm.value).subscribe();
  }

  savePassword(): void {
    const userId = this.currentUserService.userId;
    this.userService.updateUserPassword(userId, this.passwordForm.value).subscribe();
  }

  deleteAccount(): void {
    const userId = this.currentUserService.userId;
    this.userService.deleteUser(userId).subscribe();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
