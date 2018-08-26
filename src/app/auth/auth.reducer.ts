import { Action } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActionTypes } from './auth.actions';


export interface AuthState {
  isLoggedIn: boolean;
  user: User;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined
};

export function reducer(state = initialState, action: Action): AuthState {
  switch (action.type) {
    case AuthActionTypes.authenticateAction:
      return state;
    case AuthActionTypes.logoutAction:
      return state;
    default:
      return state;
  }
}
