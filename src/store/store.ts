import { connect as reduxConnect, ConnectedComponent } from 'react-redux';
import createRematchPersist from '@rematch/persist';
import { init, RematchRootState, RematchDispatch } from '@rematch/core';
import { models } from './models';

const persistPlugin = createRematchPersist({
  whitelist: ['currentUser'],
  throttle: 1000,
  version: 1,
});

export const store = init({
  plugins: [persistPlugin],
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<typeof models>;
export type RootState = RematchRootState<typeof models>;

type Connect = (
  mapStateToProps: (state: RootState) => {},
  mapDispatchToProps: (dispatch: Dispatch) => {},
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
(component: any) => ConnectedComponent<any, any>;

export const connect: Connect = reduxConnect;
