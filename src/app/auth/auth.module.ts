import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MatModule } from '../shared/module/mat.module';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
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
    StoreModule.forRoot(authReducer),
    MatModule,
    FormsModule
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
