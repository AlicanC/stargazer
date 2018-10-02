// @flow

import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppFrame from '../AppFrame';
import HomePage from '../HomePage';
import HuntPage from '../HuntPage';
import LoginPage from '../LoginPage';

import ReduxApolloProvider from './ReduxApolloProvider';
import createApplicationStore from '../../store';

export default class App extends React.PureComponent<{}, void> {
  store = createApplicationStore({
    initialState: {
      token: localStorage.getItem('token'),
    },
  });

  componentDidMount() {
    this.store.subscribe(() => {
      const { token } = this.store.getState();

      if (token) {
        localStorage.setItem('token', token);
      }
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <ReduxApolloProvider>
          <Router>
            <AppFrame>
              <Route exact path="/" component={HomePage} />
              <Route path="/hunt" component={HuntPage} />
              <Route path="/login" component={LoginPage} />
            </AppFrame>
          </Router>
        </ReduxApolloProvider>
      </Provider>
    );
  }
}
