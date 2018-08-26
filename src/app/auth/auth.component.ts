import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../reducers';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  form = {};

  constructor(
    private authService: AuthService,
    private store: Store<State>) {
  }

  ngOnInit() {
    this.form = {
      email: '',
      password: ''
    };
  }

  onAuthenticate() {
    this.authService.authenticate()
      .subscribe(console.log, () => alert('login failed'));
  }
}
