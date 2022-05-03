import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';

import {LoginPageComponent} from './pages/login/login-page.component';
import {SignUpPageComponent} from './pages/sign-up/sign-up-page.component';
import {FormComponent} from "./components/form/form.component";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../app.module';
import {HttpClient} from '@angular/common/http';
import {EditPageComponent} from "./pages/edit/edit-page.component";

@NgModule({
  declarations: [LoginPageComponent, SignUpPageComponent, EditPageComponent, FormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ],
})
export class AuthModule {
}