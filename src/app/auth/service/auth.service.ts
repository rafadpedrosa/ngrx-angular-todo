import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {User} from '../../model/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/authenticate', {email, password});
  }

}
