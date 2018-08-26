import { createSelector } from '@ngrx/store';

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(selectAuthState, auth => auth.isLoggedIn);

export const selectToken = createSelector(selectAuthState, auth => auth.api_key);

export const selectUser = createSelector(selectAuthState, auth => auth.user);

