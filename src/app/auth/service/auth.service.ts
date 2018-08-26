import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { authenticate, authenticateByToken, logout } from '../../shared/system.endpoints';
import { Authenticate, LogOut } from '../auth.actions';
import { AuthState } from '../auth.reducer';
import { selectToken } from '../auth.selectors';

@Injectable()
export class AuthService implements OnInit {

  api_key: string;

  constructor(private http: HttpClient, private store: Store<AuthState>, private router: Router) {
  }

  authenticate({ byToken = false, payload }) {
    const url = byToken ? authenticateByToken : authenticate;

    this.http.post(url, payload)
        .subscribe(this.saveUserState.bind(this), () => alert('login failed'));
  }

  logout() {
    this.cleanUserState();
    this.http.post(logout, { api_key: this.api_key });
  }

  getToken() {
    return this.store.pipe(select(selectToken));
  }

  ngOnInit(): void {
    this.getToken()
        .subscribe(api_key => this.api_key = api_key);
  }

  private cleanUserState() {
    this.store.dispatch(new LogOut());
    this.router.navigate([ '/' ]);
  }

  private saveUserState(response) {
    localStorage.setItem('api_key', response.api_key);

    const user = {
      id: response.userId,
      email: response.email,
      api_key: response.api_key
    };

    this.store.dispatch(new Authenticate(user));
    this.router.navigate([ 'private/' ]);
  }
}
