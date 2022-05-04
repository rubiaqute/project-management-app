import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        //here will be welcome page component
      },
      {
        path: 'auth',
        loadChildren: () => import('./../auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'page-not-found',
        loadChildren: () => import('./../shared/shared.module').then(m => m.SharedModule)
      },
      {
        path: 'main',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./../boards/boards.module').then(m => m.BoardsModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
