import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public isPasswordHide: boolean = true;
  public firstNameValue: string = '';
  public lastNameValue: string = '';
  public emailValue: string = '';
  public signUpForm!: FormGroup;
  private subs: Subscription | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
    this.subs = this.signUpForm.valueChanges.subscribe((val) => (console.log(val)));
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  public signUp(email: string, name: string, lastName: string = ''): void {
    console.log(email, name, lastName);
  }

  private passwordValidator(control: FormControl): { [key: string]: string } | null {
    const hasNumber = /[0-9]/.test(control.value);
    const hasLetter = /[a-z,A-Z]/.test(control.value);
    const minLength = /^.{8,}$/.test(control.value);

    if (!hasNumber)
      return { invalidPassword: "AUTH.REGISTER.PASSWORD_NO_NUMBERS" };
    if (!hasLetter)
      return {
        invalidPassword:
          "AUTH.REGISTER.PASSWORD_NO_LETTERS",
      };
    if (!minLength)
      return {
        invalidPassword: "AUTH.REGISTER.PASSWORD_MIN_LENGTH",
      };
    return null;
  }

  get firstName(): AbstractControl | null {
    return this.signUpForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.signUpForm.get('lastName');
  }

  get email(): AbstractControl | null {
    return this.signUpForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.signUpForm.get('password');
  }
}
