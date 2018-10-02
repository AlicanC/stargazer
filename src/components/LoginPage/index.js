// @flow

import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Container, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';

import ProfileView from './ProfileView';

type Props = {
  data: Object,
  dispatch: Object,
};

class LoginPage extends React.Component<Props, void> {
  onLoginClick = () => {
    const { dispatch } = this.props;

    const token = prompt('Your GitHub token');

    if (!token) return;

    dispatch.login(token);
  };

  onLogoutClick = () => {
    const { dispatch } = this.props;

    dispatch.logout();
  };

  render() {
    const { data } = this.props;

    const user = data.viewer;

    return (
      <Container>
        {user && <ProfileView user={user} />}
        <Row>
          <Col style={{ textAlign: 'center' }}>
            {user ? (
              <button onClick={this.onLogoutClick}>Logout</button>
            ) : (
              <button onClick={this.onLoginClick}>Login</button>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default compose(
  connect(),
  graphql(gql`
    query LoginPageQuery {
      viewer {
        id
        ...ProfileViewUser
      }
    }
    ${ProfileView.fragments.user}
  `),
)(LoginPage);
