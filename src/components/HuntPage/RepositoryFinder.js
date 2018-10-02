// @flow

import * as React from 'react';

import FoundRepositoriesList from './FoundRepositoriesList';

type State = {
  query: string,
};

export default class RepositoryFinder extends React.Component<{}, State> {
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
      <div>
        <input type="search" onChange={this.onQueryInputChange} />
        <FoundRepositoriesList query={query} />
      </div>
    );
  }
}
