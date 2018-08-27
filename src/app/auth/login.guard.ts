import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthState } from './redux/auth.reducer';
import { isLoggedIn } from './redux/auth.selectors';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private store: Store<AuthState>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.store.pipe(select(isLoggedIn), tap(loggedIn => {
      if (loggedIn) {
        this.router.navigate([ 'private' ]);
      }
      return !loggedIn;
    }));
  }
}
