import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../../../features/user/models/user.model';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {

  user$: BehaviorSubject<User | undefined>;
  form: FormGroup;

  constructor(
    private readonly currentUserService: CurrentUserService,
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      secondName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.email]),
      birthdayDate: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.user$ = this.currentUserService.user$;

    this.user$.subscribe(value => {
      if (!value) {
        return;
      }
      this.form.setValue({
        firstName: value.firstName,
        secondName: value.secondName,
        email: value.email,
        description: value.description,
        birthdayDate: value.birthdayDate,
      });
    });
  }


  saveMainInfo(): void {
    //
  }
}
