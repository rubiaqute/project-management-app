import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../material/material.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    WelcomeComponent
  ],
    imports: [
        CommonModule,
        WelcomeRoutingModule,
        TranslateModule,
        MaterialModule,
        MatTabsModule,
        MatExpansionModule
    ]
})
export class WelcomeModule { }
