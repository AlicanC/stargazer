// @flow

import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

import LoadingView from '../LoadingView';
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

class StarredRepositoriesList extends React.PureComponent<Props, void> {
  onMoreClick = () => {
    const { data } = this.props;

    data.fetchMore({
      variables: {
        cursor: data.viewer.starredRepositories.pageInfo.endCursor,
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

  render() {
    const { data } = this.props;

    if (data.loading) return <LoadingView />;
    if (data.error) return 'Error: ' + data.error.message;

    const { starredRepositories } = data.viewer;
    const { hasNextPage } = starredRepositories.pageInfo;

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
          <div className="text-center my-3">
            <Button onClick={this.onMoreClick} color="info">
              See More
            </Button>
          </div>
        )}
      </>
    );
  }
}

export default graphql(StarredRepositoriesQuery)(StarredRepositoriesList);
