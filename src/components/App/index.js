// @flow

import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import HomePage from '../HomePage';
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
          <div>
            <ul>
              <li>
                <Link to="/">Your Superstars</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
            <hr />
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
