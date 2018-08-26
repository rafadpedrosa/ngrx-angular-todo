import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../reducers';
import { Authenticate } from './auth.actions';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  email: '';
  password: '';

  constructor(
    private authService: AuthService,
    private store: Store<State>,
    private router: Router) {
  }

  ngOnInit() {
  }

  onAuthenticate() {
    const saveUserState = user => {
      debugger
      this.store.dispatch(new Authenticate(user));
      this.router.navigate(['private/']);
    };

    this.authService.authenticate({id: undefined, email: this.email, password: this.password})
      .subscribe(saveUserState, () => alert('login failed'));
  }
}
