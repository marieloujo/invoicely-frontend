import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { clientReducer } from '@features/clients/store/client.reducer';
import { ClientEffects } from '@features/clients/store/client.effects';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { serviceReducer } from './features/services/store/service.reducer';
import { ServiceEffects } from './features/services/store/service.effects';
import { productReducer } from './features/products/store/product.reducer';
import { ProductEffects } from './features/products/store/product.effects';
import { invoiceReducer } from './features/invoices/store/invoice.reducer';
import { InvoiceEffects } from './features/invoices/store/invoice.effects';
import { DatePipe } from '@angular/common';
import { statisticReducer } from './features/dashboard/store/statistic.reducer';
import { StatisticEffects } from './features/dashboard/store/statistic.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideStore({
      clients: clientReducer,
      services: serviceReducer,
      products: productReducer,
      invoices: invoiceReducer,
      statistics: statisticReducer
    }),
    provideEffects([ClientEffects, ServiceEffects, ProductEffects, InvoiceEffects, StatisticEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
