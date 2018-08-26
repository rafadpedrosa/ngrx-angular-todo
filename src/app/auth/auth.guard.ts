import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthState } from './auth.reducer';
import { isLoggedIn } from './auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AuthState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.store.pipe( select( isLoggedIn ), tap( loggedIn => {
      if (!loggedIn) {
        this.router.navigate( [ '' ] );
      }
      return loggedIn;
    } ) );
  }
}
