import { User } from '../model/user.model';
import { AuthActions, AuthActionTypes } from './auth.actions';


export interface AuthState {
  isLoggedIn: boolean;
  user: User;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.authenticateAction:
      return {
        isLoggedIn: true,
        user: action.payload
      };
    case AuthActionTypes.logoutAction:
      return {
        isLoggedIn: false,
        user: undefined
      };
    default:
      return state;
  }
}
