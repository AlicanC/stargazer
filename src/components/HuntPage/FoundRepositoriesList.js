// @flow

import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

import LoadingView from '../LoadingView';
import RepositoryView from '../RepositoryView';

const FoundRepositoriesQuery = gql`
  query FoundRepositoriesQuery($query: String!, $cursor: String) {
    search(type: REPOSITORY, first: 10, query: $query, after: $cursor) {
      edges {
        node {
          ... on Repository {
            id
            ...RepositoryViewRepository
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${RepositoryView.fragments.repository}
`;

type Props = {
  query: string,
  data: any,
};

function FoundRepositoriesList(props: Props) {
  const { data } = props;

  if (data.loading) return <LoadingView />;
  if (data.error) return 'Error: ' + data.error.message;

  const { search } = data;
  const { hasNextPage } = search.pageInfo;

  const fetchMore = () => {
    data.fetchMore({
      variables: {
        cursor: search.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.search.edges;
        const pageInfo = fetchMoreResult.search.pageInfo;

        return newEdges.length
          ? {
              search: {
                __typename: previousResult.search.__typename,
                edges: [...previousResult.search.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  return (
    <>
      <ListGroup>
        {search.edges.map(({ node: repository }) => (
          <ListGroupItem key={repository.id}>
            <RepositoryView repository={repository} />
          </ListGroupItem>
        ))}
      </ListGroup>
      {hasNextPage && (
        <div className="text-center my-3">
          <Button onClick={fetchMore} color="info">
            See More
          </Button>
        </div>
      )}
    </>
  );
}

export default graphql(FoundRepositoriesQuery, {
  options: (props) => ({
    variables: {
      query: props.query,
    },
  }),
})(FoundRepositoriesList);
