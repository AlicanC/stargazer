// @flow

import * as React from 'react';
import { Jumbotron, Button } from 'reactstrap';

type Props = {
  onDismissClick: Function,
};

export default function Introduction(props: Props) {
  const { onDismissClick } = props;

  return (
    <Jumbotron>
      <h1 className="display-5">Welcome to Superstargazer!</h1>
      <p className="lead">
        Use Superstargazer to see your starred GitHub repos and hunt for new repos to star!
      </p>
      <div className="text-right">
        <Button onClick={onDismissClick} color="primary">
          Dismiss
        </Button>
      </div>
    </Jumbotron>
  );
}
