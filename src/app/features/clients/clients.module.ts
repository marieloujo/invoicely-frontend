import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { clientReducer } from './store/client.reducer';
import { ClientEffects } from './store/client.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ clients: clientReducer }),
    EffectsModule.forRoot([ClientEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false })
  ]
})
export class ClientsModule { }
