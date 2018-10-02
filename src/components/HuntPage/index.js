// @flow

import * as React from 'react';
import { Container, Col, Row, Input } from 'reactstrap';

import FoundRepositoriesList from './FoundRepositoriesList';

type State = {
  query: string,
};

export default class HuntPage extends React.Component<{}, State> {
  state = {
    query: '',
  };

  onQueryInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: { value: query },
    } = event;

    this.setState({ query });
  };

  render() {
    const { query } = this.state;

    return (
      <Container>
        <Row className="mb-3">
          <Col>
            <Input type="search" onChange={this.onQueryInputChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <FoundRepositoriesList query={query} />
          </Col>
        </Row>
      </Container>
    );
  }
}
