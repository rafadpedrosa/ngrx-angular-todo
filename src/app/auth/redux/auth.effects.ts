import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActionTypes, Authenticate, LogOut, RefreshToken } from './auth.actions';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  authenticate$ = this.actions$.pipe(
    ofType<Authenticate>(AuthActionTypes.authenticateAction),
    tap(action => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('api_key', action.payload.api_key);
      this.router.navigate([ 'private/' ]);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<LogOut>(AuthActionTypes.logoutAction),
    tap(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('api_key');
      this.router.navigate([ '' ]);
    })
  );

  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem('user');
    const refreshUser = () => {
      const user = JSON.parse(userData);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('api_key', user.api_key);
      return of(new RefreshToken(user));
    };

    return userData
      ? refreshUser()
      : of(new LogOut());
  });

  constructor(private actions$: Actions, private router: Router) {
  }
}
