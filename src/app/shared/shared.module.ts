import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';


import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
    declarations: [PageNotFoundComponent, ModalComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'en'
        })
    ],
    exports: [
        ModalComponent
    ]
})
export class SharedModule {}

