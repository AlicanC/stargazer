// @flow

import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';

import NavigationBar from './NavigationBar';

type Props = {
  children: React.Node,
};

type State = {
  isCollapseOpen: boolean,
};

export default class AppFrame extends React.Component<Props, State> {
  state = {
    isCollapseOpen: false,
  };

  onToggleCollapseClick = () => {
    const { isCollapseOpen } = this.state;
    this.setState({ isCollapseOpen: !isCollapseOpen });
  };

  render() {
    const { children } = this.props;
    const { isCollapseOpen } = this.state;

    return (
      <Container>
        <Row className="mb-3">
          <Col className="p-0">
            <NavigationBar
              isCollapseOpen={isCollapseOpen}
              onToggleCollapseClick={this.onToggleCollapseClick}
            />
          </Col>
        </Row>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    );
  }
}
