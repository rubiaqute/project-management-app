import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ISignUp, ISignUpRequest, IUser, IUserRequest } from "../../../core/models/api.models";
import { ApiServices } from "../../../core/services/api-services";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ApiFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.components.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  public isPasswordHide: boolean = true;
  public nameValue: string = '';
  public emailValue: string = '';
  public signUpForm!: FormGroup;
  private subs: Subscription | undefined;
  activeUser$: Observable<IUser | null> = this.apiFacade.activeUser$
  toggleBoard: boolean = true;


  constructor(private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    private apiService: ApiServices,
    private apiFacade: ApiFacade) {
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
    const userId = JSON.parse(localStorage.getItem('currentUserRubiaqute')!).id
    this.apiService.updateUser(userId, body).subscribe((user: any) => {
      this.authService.setUser(user)
      console.log(user);
      //Here you can insert the window "Profile changed successfully"
    })
    this.router.navigateByUrl('/main');
  }

  signup() {
    const body: ISignUpRequest = {
      login: this.email?.value,
      password: this.password?.value,
      name: this.name?.value,
    }
    this.apiService.signUp(body).subscribe((data: ISignUp) => {
      this.router.navigateByUrl('/auth/login');
    })
  }

  deleteUser() {
    const user = JSON.parse(localStorage.getItem('currentUserRubiaqute')!)
    if (user) {
      this.apiService.deleteUser(user.id).subscribe(() => {
        console.log('User deleted');
      },
        (error) => {
          console.log(error);
          //Here you can insert the window "User deleted"
        });
      this.authService.clearInfo();
      setTimeout(() => this.router.navigateByUrl('/auth/login'), 0);
    }
  }
}
