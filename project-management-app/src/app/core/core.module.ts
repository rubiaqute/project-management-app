import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { CoreRoutingModule } from './core-routing.module';



@NgModule({
  declarations: [DashboardComponent, FooterComponent],
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    CoreRoutingModule,
  ]
})
export class CoreModule { }
