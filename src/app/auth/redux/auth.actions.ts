import { Action } from '@ngrx/store';
import { User } from '../../model/user.model';

export enum AuthActionTypes {
  authenticateAction = '[authenticate] authenticate user', logoutAction = '[logout] logout user',
}

export class Authenticate implements Action {
  readonly type = AuthActionTypes.authenticateAction;

  constructor(public payload: User) {
  }
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.logoutAction;
}

export type AuthActions = Authenticate | LogOut;
