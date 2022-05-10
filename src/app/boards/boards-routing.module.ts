import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import {EditBoardComponent} from "./pages/edit-board/edit-board.component";
import {NewBoardComponent} from "./pages/new-board/new-board.component";

const routes: Routes = [
  { path: '', component: BoardsComponent },
  { path: 'boards/:id', component: BoardComponent },
  { path: 'board/edit-board/:id', component: EditBoardComponent },
  { path: 'board/new-board', component: NewBoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule { }
