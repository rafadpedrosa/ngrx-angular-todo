import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../auth/redux/auth.selectors';
import { AuthService } from '../auth/service/auth.service';
import { User } from '../model/user.model';
import { State } from '../reducers';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: [ './private.component.scss' ]
})
export class PrivateComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private store: Store<State>, private router: Router) {
  }

  ngOnInit() {
    this.subscribeUser();
  }

  logout() {
    this.authService.logout();
  }

  private subscribeUser() {
    const setUser = user => this.user = user;
    this.store.pipe(select(selectUser)).subscribe(setUser);
  }
}
