// @flow

import { type State, type Action } from '.';

const initialState = {
  token: null,
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'LOGIN': {
      const { token } = action.payload;

      const nextState = {
        ...state,
        token,
      };

      return nextState;
    }
    case 'LOGOUT': {
      const nextState = {
        ...state,
        token: null,
      };

      return nextState;
    }
    default: {
      return state;
    }
  }
}
