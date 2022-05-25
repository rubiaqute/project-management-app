import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { CoreRoutingModule } from './core-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "../shared/shared.module";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [DashboardComponent, FooterComponent, HeaderComponent, ConfirmationModalComponent],
    imports: [
        FormsModule,
      ReactiveFormsModule,
        MaterialModule,
        CommonModule,
        CoreRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'en'
        }),
        MatMenuModule,
        SharedModule
    ]
})
export class CoreModule { }
