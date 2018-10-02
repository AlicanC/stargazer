// @flow

import * as React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';

import LoginRequiredView from '../LoginRequiredView';

import StarredRepositoriesList from './StarredRepositoriesList';

type Props = {
  token: ?string,
};

function HomePage(props: Props) {
  const { token } = props;

  return (
    <Container>
      {token ? (
        <Row>
          <Col>
            <StarredRepositoriesList />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <LoginRequiredView />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default connect((state) => ({
  token: state.token,
}))(HomePage);
