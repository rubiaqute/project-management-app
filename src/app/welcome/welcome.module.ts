import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from '../core/pages/welcome/welcome.component';
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../material/material.module";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    TranslateModule,
    MaterialModule,
    MatTabsModule
  ]
})
export class WelcomeModule { }