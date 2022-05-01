import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {IUserRequest} from "../../../core/models/api.models";
import {ApiServices} from "../../../core/services/api-services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.components.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  public isPasswordHide: boolean = true;
  public nameValue: string = '';
  public emailValue: string = '';
  public signUpForm!: FormGroup;
  private subs: Subscription | undefined;

  constructor(private fb: FormBuilder,
              private router: Router,
              private apiService: ApiServices) {
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  private passwordValidator(control: FormControl): { [key: string]: string } | null {
    const hasNumber = /[0-9]/.test(control.value);
    const hasLetter = /[a-z,A-Z]/.test(control.value);
    const minLength = /^.{8,}$/.test(control.value);

    if (!hasNumber)
      return {invalidPassword: "AUTH.REGISTER.PASSWORD_NO_NUMBERS"};
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

  get name(): AbstractControl | null {
    return this.signUpForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.signUpForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.signUpForm.get('password');
  }

  edit() {
    const body: IUserRequest = {
      name: this.name?.value,
      login: this.email?.value,
      password: this.password?.value,
    }
    this.apiService.updateUser(localStorage.getItem('id'), body).subscribe((data: any) => {
      console.log(data);
      //Here you can insert the window "Profile changed successfully"
    })
    this.router.navigateByUrl('/main');
  }
}
