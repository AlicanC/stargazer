// @flow

import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Container, Col, Row, Button } from 'reactstrap';
import { connect } from 'react-redux';

import ProfileView from './ProfileView';

type Props = {
  data: Object,
  dispatch: Object,
  history: Object,
};

class LoginPage extends React.PureComponent<Props, void> {
  async componentDidMount() {
    const { dispatch, history } = this.props;

    const params = new URLSearchParams(history.location.search);
    const token = params.get('token');

    if (token) {
      dispatch.login(token);
    }
  }

  onLoginClick = () => {
    // const { dispatch } = this.props;
    // const token = prompt('Your GitHub token');
    // if (!token) return;
    // dispatch.login(token);

    const config = {
      clientId: 'f84cc67f3f769f36f662',
      redirectUri: 'https://alicanc-stargazer.herokuapp.com/github_callback',
    };

    const { clientId, redirectUri } = config;
    const scope = ['public_repo'].join(' ');
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.open(authUrl);
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
                {/* <p>
                  Create a GitHub token <a href="https://github.com/settings/tokens/new">here</a>{' '}
                  and login.
                </p> */}
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
