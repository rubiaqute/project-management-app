import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { 
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full'
      }, 
      { 
        path: 'boards', 
        component: MainComponent
      }, 
      { 
        path: 'auth', 
        loadChildren: () => import('./../auth/auth.module').then(m => m.AuthModule)
      }, 
      { 
        path: 'page-not-found', 
        loadChildren: () => import('./../shared/shared.module').then(m => m.SharedModule)
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
