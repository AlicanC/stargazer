// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import createApolloClient from './createApolloClient';

type Props = {
  token: ?string,
  children: React.Node,
};

type State = {
  apolloClient: ApolloClient,
};

class ReduxApolloProvider extends React.PureComponent<Props, State> {
  getApolloClientConfig = () => ({
    token: this.props.token,
  });

  state = {
    apolloClient: createApolloClient(this.getApolloClientConfig),
  };

  componentDidUpdate(prevProps: Props) {
    const { token } = this.props;

    if (token !== prevProps.token) {
      this.setState({
        apolloClient: createApolloClient(this.getApolloClientConfig),
      });
    }
  }

  render() {
    const { children } = this.props;
    const { apolloClient } = this.state;

    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
  }
}

export default connect((state) => ({ token: state.token }))(ReduxApolloProvider);
