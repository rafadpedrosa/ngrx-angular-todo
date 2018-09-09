import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
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
import { MatModule } from './shared/module/mat.module';
import { CustomSerializer } from './shared/store.router.custom';
import { CardTaskComponent } from './task/card-task/card-task.component';
import { TaskEffects } from './task/redux/task.effects';
import { TaskComponent } from './task/task.component';

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
    TaskComponent,
    CardTaskComponent,
  ],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    AuthModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ TaskEffects ]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    HttpClientModule,
    BrowserModule,
    MatModule,
    FormsModule,
    BrowserAnimationsModule,
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : []
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [ AppComponent ],
  exports: []
})
export class AppModule {
}
