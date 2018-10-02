// @flow

import * as React from 'react';
import { Container, Col, Row, Input } from 'reactstrap';
import { connect } from 'react-redux';

import LoginRequiredView from '../LoginRequiredView';

import FoundRepositoriesList from './FoundRepositoriesList';

type Props = {
  token: ?string,
};

type State = {
  query: string,
};

class HuntPage extends React.PureComponent<Props, State> {
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
    const { token } = this.props;
    const { query } = this.state;

    return (
      <Container>
        {token ? (
          <>
            <Row className="mb-3">
              <Col style={{ textAlign: 'center' }}>
                <h5>Get ready to hunt!</h5>
                Search for superstar repos and star them!
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Input type="search" onChange={this.onQueryInputChange} />
              </Col>
            </Row>
            {query.length ? (
              <Row>
                <Col>
                  <FoundRepositoriesList query={query} />
                </Col>
              </Row>
            ) : null}
          </>
        ) : (
          <LoginRequiredView />
        )}
      </Container>
    );
  }
}

export default connect((state) => ({
  token: state.token,
}))(HuntPage);
