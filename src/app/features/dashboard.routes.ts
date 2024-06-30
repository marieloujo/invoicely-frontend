import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { ClientIndexComponent } from './clients/components/client-index/client-index.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'clients', component: ClientIndexComponent },
      { path: '', redirectTo: 'app', pathMatch: 'full' }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }