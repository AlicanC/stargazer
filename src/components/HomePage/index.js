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
        <>
          <Row className="mb-3">
            <Col style={{ textAlign: 'center' }}>
              <h5>Here are your superstar repos</h5>
            </Col>
          </Row>
          <Row>
            <Col className="px-0 px-sm-3">
              <StarredRepositoriesList />
            </Col>
          </Row>
        </>
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
