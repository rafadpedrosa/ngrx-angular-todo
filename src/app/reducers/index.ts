import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { authReducer } from '../auth/redux/auth.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
