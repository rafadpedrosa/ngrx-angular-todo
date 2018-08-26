import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Authenticate, LogOut } from '../auth/auth.actions';
import { isLoggedOut } from '../auth/auth.selectors';
import { AuthService } from '../auth/service/auth.service';
import { State } from '../reducers';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private store: Store<State>,
    private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    const cleanUserState = () => {
      this.store.dispatch(new LogOut());
      this.router.navigate(['/']);
    };

    this.authService.logout()
      .subscribe(cleanUserState, () => alert('something goes wrong'));
  }

}
