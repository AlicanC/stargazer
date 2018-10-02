// @flow

import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import AppFrame from '../AppFrame';
import HomePage from '../HomePage';
import HuntPage from '../HuntPage';
import LoginPage from '../LoginPage';

import createApolloClient from './createApolloClient';

export default class App extends React.Component<{}, void> {
  getApolloClientConfig = () => ({
    token: localStorage.getItem('token'),
  });

  apolloClient = createApolloClient(this.getApolloClientConfig);

  render() {
    const { apolloClient } = this;

    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <AppFrame>
            <Route exact path="/" component={HomePage} />
            <Route path="/hunt" component={HuntPage} />
            <Route path="/login" component={LoginPage} />
          </AppFrame>
        </Router>
      </ApolloProvider>
    );
  }
}
