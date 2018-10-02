// @flow

import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ListGroup, ListGroupItem } from 'reactstrap';

import RepositoryView from '../RepositoryView';

const StarredRepositoriesQuery = gql`
  query StarredRepositoriesQuery($cursor: String) {
    viewer {
      id
      starredRepositories(first: 10, after: $cursor) {
        edges {
          node {
            id
            ...RepositoryViewRepository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${RepositoryView.fragments.repository}
`;

type Props = {
  data: any,
};

function StarredRepositoriesList(props: Props) {
  const { data } = props;

  if (data.loading) return 'Loading...';
  if (data.error) return 'Error: ' + data.error.message;

  const { starredRepositories } = data.viewer;
  const { hasNextPage } = starredRepositories.pageInfo;

  const fetchMore = () => {
    data.fetchMore({
      variables: {
        cursor: starredRepositories.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.viewer.starredRepositories.edges;
        const pageInfo = fetchMoreResult.viewer.starredRepositories.pageInfo;

        return newEdges.length
          ? {
              viewer: {
                ...data.viewer,
                starredRepositories: {
                  __typename: previousResult.viewer.starredRepositories.__typename,
                  edges: [...previousResult.viewer.starredRepositories.edges, ...newEdges],
                  pageInfo,
                },
              },
            }
          : previousResult;
      },
    });
  };

  return (
    <>
      <ListGroup>
        {starredRepositories.edges.map(({ node: repository }) => (
          <ListGroupItem key={repository.id}>
            <RepositoryView repository={repository} />
          </ListGroupItem>
        ))}
      </ListGroup>
      {hasNextPage && (
        <div className="my-3" style={{ textAlign: 'right' }}>
          <button onClick={fetchMore}>See More</button>
        </div>
      )}
    </>
  );
}

export default graphql(StarredRepositoriesQuery)(StarredRepositoriesList);
