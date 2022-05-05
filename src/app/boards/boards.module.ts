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
import { EditBoardComponent } from './pages/edit-board/edit-board.component';
import { NewBoardComponent } from './pages/new-board/new-board.component';
import { FormBoardComponent } from './components/form-board/form-board.component';



@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    EditBoardComponent,
    NewBoardComponent,
    FormBoardComponent
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
    })
  ],
})
export class BoardsModule { }
