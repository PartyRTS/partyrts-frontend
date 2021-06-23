import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../features/user/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../features/user/services/user.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteUserDialog} from '../../../../features/user/components/delete-user/delete-user.dialog';
import {AuthService} from '../../../../features/core/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {

  user$: Observable<User>;
  infoForm: FormGroup;
  passwordForm: FormGroup;

  currentUserId: number;

  selectedFile;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly http: HttpClient,
    private readonly snackbar: MatSnackBar,
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
    this.currentUserId = this.authService.userId;
    this.user$ = this.userService.getUser(this.currentUserId);

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

  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
  }

  async onUpload(): Promise<void> {
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
    try {
      await this.http.post<any>(`${environment.apiUrl}/api/v1/aws/${this.currentUserId}/logo`, uploadData).toPromise();
    } catch (e) {
      // Fixme
    }
    this.user$ = this.userService.getUser(this.currentUserId);
    this.snackbar.open('Иконка обновлена', 'Ок', {
      duration: 3000
    });
  }

  saveInfo(): void {
    const userId = this.authService.userId;
    this.userService.updateUser(userId, this.infoForm.value).subscribe(() => {
      this.snackbar.open('Данные обновлены', 'Ок', {
        duration: 3000
      });
    });
  }

  savePassword(): void {
    const userId = this.authService.userId;
    this.userService.updateUserPassword(userId, this.passwordForm.value).subscribe();
  }

  deleteAccount(): void {
    this.dialog.open(DeleteUserDialog);
  }
}
