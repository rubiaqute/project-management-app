import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardsRoutingModule } from './boards-routing.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { FormBoardComponent } from './components/form-board/form-board.component';
import { FilterPipe } from "./pipes/filter.pipes";
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    FormBoardComponent,
    FilterPipe,
    ColumnComponent,
    TaskComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BoardsRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'en'
        }),
        DragDropModule,
        SharedModule
    ],
})
export class BoardsModule { }
