import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatModule } from '../shared/module/mat.module';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { AuthEffects } from './redux/auth.effects';
import { authReducer } from './redux/auth.reducer';
import { AuthService } from './service/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      }
    ]),
    MatModule,
    FormsModule,
    StoreModule.forRoot(authReducer),
    EffectsModule.forFeature([ AuthEffects ]),
  ],
  declarations: [
    AuthComponent,
  ],
  exports: [
    AuthComponent,
    MatModule
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    };
  }
}
