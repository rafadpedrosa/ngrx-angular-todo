import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { LoginGuard } from './auth/login.guard';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { PrivateComponent } from './private/private.component';
import { metaReducers, reducers } from './reducers';

const appRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [
      LoginGuard
    ]
  },
  {
    path: '',
    component: AuthComponent,
    canActivate: [
      LoginGuard
    ]
  },
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PrivateComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    BrowserModule,
    BrowserAnimationsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [ AppComponent ],
  exports: []
})
export class AppModule {
}
