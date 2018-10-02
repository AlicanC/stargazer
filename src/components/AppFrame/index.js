// @flow

import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';

import NavigationBar from './NavigationBar';
import IntroductionJumbotron from './IntroductionJumbotron';

type Props = {
  children: React.Node,
};

type State = {
  isCollapseOpen: boolean,
  isIntroductionDismissed: boolean,
};

export default class AppFrame extends React.Component<Props, State> {
  state = {
    isCollapseOpen: false,
    isIntroductionDismissed: false,
  };

  onToggleCollapseClick = () => {
    const { isCollapseOpen } = this.state;
    this.setState({ isCollapseOpen: !isCollapseOpen });
  };

  onIntroductionDismissClick = () => {
    this.setState({ isIntroductionDismissed: true });
  };

  render() {
    const { children } = this.props;
    const { isCollapseOpen, isIntroductionDismissed } = this.state;

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
        {!isIntroductionDismissed && (
          <Row>
            <Col>
              <IntroductionJumbotron onDismissClick={this.onIntroductionDismissClick} />
            </Col>
          </Row>
        )}
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    );
  }
}
