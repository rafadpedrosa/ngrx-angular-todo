import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authenticate, authenticateByToken, logout } from '../../shared/system.endpoints';
import { Authenticate, LogOut } from '../redux/auth.actions';
import { AuthState } from '../redux/auth.reducer';

@Injectable()
export class AuthService implements OnInit {

  api_key: string;

  constructor(private http: HttpClient, private store: Store<AuthState>, private router: Router) {
  }

  authenticate({ byToken = false, payload }) {
    const url = byToken
      ? authenticateByToken
      : authenticate;

    this.http.post(url, payload)
    .subscribe(this.saveUserState.bind(this), error => this.onError(error, 'Login fail'));
  }

  onError(error, message) {
    if (error.status === 401) {
      alert('User not authorized');
    } else {
      alert(message);
    }
  }

  logout() {
    this.cleanUserState();
    this.http.post(logout, { api_key: this.api_key });
  }

  ngOnInit(): void {
  }

  private cleanUserState() {
    this.store.dispatch(new LogOut());
    this.router.navigate([ '/' ]);
  }

  private saveUserState(response) {
    const user = {
      id: response.userId,
      username: response.username,
      email: response.email,
      api_key: response.api_key
    };

    this.store.dispatch(new Authenticate(user));
  }
}
