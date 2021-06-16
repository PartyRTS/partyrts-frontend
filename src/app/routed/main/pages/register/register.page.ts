import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../features/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(
    private readonly route: Router,
    private readonly authService: AuthService,
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      secondName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.email]),
      birthdayDate: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      passwordAgain: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  onRegisterButtonClick(): void {
    console.log(this.form);
    const firstName = this.form.value.firstName;
    const secondName = this.form.value.secondName;
    const email = this.form.value.email;
    const description = this.form.value.email;
    const birthdayDate = this.form.value.birthdayDate;
    const password = this.form.value.password;
    // const passwordAgain = this.form.value.passwordAgain;

    this.authService.register({firstName, secondName, email, birthdayDate, description, password}).subscribe(
      () => {
        this.route.navigate(['/']);
      },
      error => {
        alert('oops! error:' + error);
      }
    );
  }
}
