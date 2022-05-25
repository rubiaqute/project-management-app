import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthInterceptorService } from "./auth/services/auth-interceptor.service";
import { ActionReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { EffectsModule } from "@ngrx/effects";
import { currentUserReducer } from './store/reducers/current-user.reducers';
import { ActiveBoardState, BoardsState, CurrentUserState } from './store/state';
import { activeBoardReducer } from './store/reducers/active-board.reducers';
import { GetBoardsRouteEffects } from './store/effects/boards.effects';
import { GetActiveBoardEffects } from './store/effects/active-board.effects';
import { boardsReducer } from './store/reducers/boards.reducers';
import { GetCurrentUserEffects } from './store/effects/current-user.effects';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    StoreModule.forRoot(
      {
        currentUserState: currentUserReducer as ActionReducer<CurrentUserState>,
        activeBoardState: activeBoardReducer as ActionReducer<ActiveBoardState>,
        boardsState: boardsReducer as ActionReducer<BoardsState>
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      },
    ),
    EffectsModule.forRoot([GetCurrentUserEffects, GetBoardsRouteEffects, GetActiveBoardEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
