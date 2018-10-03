// @flow

import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Container, Col, Row, Button } from 'reactstrap';
import { connect } from 'react-redux';
import firebase from 'firebase/app';

import ProfileView from './ProfileView';

type Props = {
  data: Object,
  dispatch: Object,
  history: Object,
};

class LoginPage extends React.PureComponent<Props, void> {
  onLoginClick = () => {
    const { dispatch } = this.props;

    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('public_repo');
    provider.setCustomParameters({
      allow_signup: 'false',
    });

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result.credential) {
          var token = result.credential.accessToken;
          dispatch.login(token);
        }
      });
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
        {user ? (
          <>
            <Row className="mb-3">
              <Col className="text-center">
                <ProfileView user={user} />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button onClick={this.onLogoutClick} color="primary">
                  Logout
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row className="mb-3">
              <Col className="text-center">
                <h5>Login now to start hunting for superstar repos!</h5>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button onClick={this.onLoginClick} color="primary">
                  Login
                </Button>
              </Col>
            </Row>
          </>
        )}
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
