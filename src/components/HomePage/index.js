// @flow

import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default function HomePage() {
  return (
    <div>
      HomePage
      <Query
        query={gql`
          {
            viewer {
              starredRepositories(first: 10) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return JSON.stringify(data);
        }}
      </Query>
    </div>
  );
}
