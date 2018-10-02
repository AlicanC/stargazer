// @flow

import { createStore, compose, bindActionCreators } from 'redux';

import reducer from './reducer';

export type Action = { type: 'LOGIN', payload: { token: string } } | { type: 'LOGOUT' };

const actionCreators = {
  login: (token: string) => ({ type: 'LOGIN', payload: { token } }),
  logout: () => ({ type: 'LOGOUT' }),
};

export type State = {
  token: ?string,
};

type Config = {
  initialState?: State,
};

export default function createApplicationStore(config: Config = {}) {
  const { initialState } = config;

  const store = createStore(
    reducer,
    initialState,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
  );

  const boundActionCreators = bindActionCreators(actionCreators, store.dispatch);
  Object.assign(store.dispatch, boundActionCreators);

  return store;
}
