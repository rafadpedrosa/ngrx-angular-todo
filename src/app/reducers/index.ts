import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { authReducer } from '../auth/redux/auth.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [ storeFreeze ]
  : [];
