import { User } from '../model/user.model';
import { AuthActions, AuthActionTypes } from './auth.actions';


export interface AuthState {
  isLoggedIn: boolean;
  user: User;
  api_key: string;
}

export const initialState: AuthState = {
  api_key: '',
  isLoggedIn: false,
  user: undefined
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.authenticateAction:
      return {
        api_key: action.payload.api_key,
        isLoggedIn: true,
        user: action.payload
      };
    case AuthActionTypes.logoutAction:
      return {
        api_key: '',
        isLoggedIn: false,
        user: undefined
      };
    default:
      return state;
  }
}
