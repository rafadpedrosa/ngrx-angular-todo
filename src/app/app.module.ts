import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { PrivateComponent } from './private/private.component';
import { metaReducers, reducers } from './reducers';

const appRoutes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', component: AuthComponent},
  {path: 'private', component: PrivateComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PrivateComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    BrowserModule,
    BrowserAnimationsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
