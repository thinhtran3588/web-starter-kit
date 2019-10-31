import { createModel, ModelReducers } from '@rematch/core';
import produce from 'immer';
import { User } from '@app/core';

export type CurrentUserState = User;

export const defaultUser: CurrentUserState = {
  id: '',
  displayName: '',
  avatarUrl: '',
  isLoggedIn: false,
  emailVerified: undefined,
  loginType: 'EMAIL',
};

const reducers: ModelReducers<CurrentUserState> = {
  login: produce((draftState: CurrentUserState, payload: CurrentUserState) => {
    Object.assign(draftState, payload);
  }),
  logout: produce((draftState: CurrentUserState) => {
    Object.assign(draftState, defaultUser);
  }),
  update: produce((draftState: CurrentUserState, payload: CurrentUserState) => {
    Object.assign(draftState, payload);
  }),
  markEmailVerified: produce((draftState: CurrentUserState) => {
    draftState.emailVerified = true;
  }),
};

export const currentUser = createModel<CurrentUserState>({
  state: defaultUser,
  reducers,
});
