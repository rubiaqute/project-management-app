import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiServices } from "../../../core/services/api-services.service";
import { ISignInRequest, IUser } from "../../../core/models/api.models";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})

export class LoginPageComponent implements OnInit, OnDestroy {
  public isPasswordHide: boolean = true;
  public name: string = '';
  public token: string = 'fake';
  public loginForm!: FormGroup;
  private subs: Subscription | undefined;
  public errorMessage = '';
  public isLoading = false;
  public isErrorModalOn: boolean = false

  constructor(private fb: FormBuilder,
    private router: Router,
    private apiService: ApiServices,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
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
      return { invalidPassword: "AUTH.LOGIN.PASSWORD_NO_NUMBERS" };
    if (!hasLetter)
      return {
        invalidPassword:
          "AUTH.LOGIN.PASSWORD_NO_LETTERS",
      };
    if (!minLength)
      return {
        invalidPassword: "AUTH.LOGIN.PASSWORD_MIN_LENGTH",
      };
    return null;
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  login(): void {
    this.isLoading = true
    const body: ISignInRequest = {
      login: this.email?.value,
      password: this.password?.value,
    }
    this.apiService.signIn(body).subscribe((res: any) => {
      this.authService.setToken(res?.token);
      this.apiService.getUsers().subscribe((users: IUser[]) => {
        const currentUser = users.find((user: IUser) => user.login === body.login)
        this.authService.setUser(currentUser!);
      })

      this.isLoading = false
      this.router.navigateByUrl('/main');
    },
      (error: Error) => {

        this.isLoading = false
        this.isErrorModalOn = true
        //Here you can insert the window "Incorrectly entered email or login"
      });
  }
}
