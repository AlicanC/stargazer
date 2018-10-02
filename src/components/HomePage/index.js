// @flow

import * as React from 'react';
import { Container, Col, Row } from 'reactstrap';

import StarredRepositoriesList from './StarredRepositoriesList';

export default function HomePage() {
  return (
    <Container>
      <Row>
        <Col>
          <StarredRepositoriesList />
        </Col>
      </Row>
    </Container>
  );
}
