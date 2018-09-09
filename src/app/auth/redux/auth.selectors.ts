import { createSelector } from '@ngrx/store';

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(selectAuthState, auth => auth && auth.isLoggedIn);

export const selectUser = createSelector(selectAuthState, auth => auth.user);

export const userName = createSelector(selectAuthState, auth => auth.user && auth.user.username);

export const api_key = createSelector(selectAuthState, auth => auth.api_key);


