import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  email: '';
  password: '';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {}

  onAuthenticate() {
    const payload = {
      email: this.email,
      password: this.password
    };

    this.authService.authenticate({ payload });
  }
}
