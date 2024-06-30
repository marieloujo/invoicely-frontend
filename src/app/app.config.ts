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

export const appConfig: ApplicationConfig = {
  providers: [
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
      clients: clientReducer
    }),
    provideEffects([ClientEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
