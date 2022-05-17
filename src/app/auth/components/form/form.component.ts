import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ISignUp, ISignUpRequest, IUser, IUserRequest } from "../../../core/models/api.models";
import { ApiServices } from "../../../core/services/api-services.service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ApiFacade } from 'src/app/store/facade';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
  public isErrorModalOn: boolean = false


  constructor(private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    private apiService: ApiServices,
    private apiFacade: ApiFacade,
    public dialog: MatDialog) {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { name: 'CONFIRMATION.PROFILE', isConfirmed: false },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteUser()
    });
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
    }, (error) => this.isErrorModalOn = true)
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
    },
      (error) => {
        this.isErrorModalOn = true
      })
  }

  deleteUser() {
    const user = JSON.parse(localStorage.getItem('currentUserRubiaqute')!)
    if (user) {
      this.apiService.deleteUser(user.id).subscribe(() => {
        console.log('User deleted');
      },
        (error) => {
          this.isErrorModalOn = true
        });
      this.authService.clearInfo();
      setTimeout(() => this.router.navigateByUrl('/auth/login'), 0);
    }
  }
}
