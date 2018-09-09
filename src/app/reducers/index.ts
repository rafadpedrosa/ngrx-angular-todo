import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { authReducer } from '../auth/redux/auth.reducer';
import { taskReducer } from '../task/redux/task.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  auth: authReducer,
  task: taskReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [ storeFreeze ]
  : [];
