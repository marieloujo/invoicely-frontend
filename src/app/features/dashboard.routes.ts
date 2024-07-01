import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { ClientIndexComponent } from './clients/components/client-index/client-index.component';
import { ServiceIndexComponent } from './services/components/service-index/service-index.component';
import { ProductIndexComponent } from './products/components/product-index/product-index.component';
import { InvoiceIndexComponent } from './invoices/components/invoice-index/invoice-index.component';
import { InvoiceDetailComponent } from './invoices/components/invoice-detail/invoice-detail.component';
import { InvoiceCreateComponent } from './invoices/components/invoice-create/invoice-create.component';
import { LayoutComponent } from './layout.component';
import { DashboardIndexComponent } from './dashboard/components/dashboard-index/dashboard-index.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardIndexComponent },
      { path: 'clients', component: ClientIndexComponent },
      { path: 'services', component: ServiceIndexComponent },
      { path: 'produits', component: ProductIndexComponent },
      {
        path: 'factures',
        children: [
          { path: '', component: InvoiceIndexComponent },
          { path: 'create', component: InvoiceCreateComponent },
          { path: ':id', component: InvoiceDetailComponent },
        ]
      },
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