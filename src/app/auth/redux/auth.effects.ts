import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActionTypes, Authenticate, LogOut } from './auth.actions';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  authenticate$ = this.actions$.pipe(
    ofType<Authenticate>(AuthActionTypes.authenticateAction),
    tap(action => {
      console.log('authenticate$');
      localStorage.setItem('user', JSON.stringify(action.payload));
      this.router.navigate([ 'private/' ]);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<LogOut>(AuthActionTypes.logoutAction),
    tap(() => {
      console.log('logout$');
      localStorage.removeItem('user');
      this.router.navigate([ '' ]);
    })
  );

  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem('user');
    const authenticate = () => {
      const user = JSON.parse(userData);
      return of(new Authenticate(user));
    };

    return userData
      ? authenticate()
      : of(new LogOut());
  });

  constructor(private actions$: Actions, private router: Router) {
  }
}
