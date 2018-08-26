import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class AuthService {

  constructor() {
  }

  authenticate() {
    return of('user logged in');
  }
}
