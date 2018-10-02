// @flow

import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

type Props = {
  repository: Object,
  addStar: Function,
  removeStar: Function,
};

function RepositoryView(props: Props) {
  const { repository, addStar, removeStar } = props;
  const { name, url, viewerHasStarred } = repository;

  return (
    <div>
      <a href={url}>{name}</a>
      {viewerHasStarred ? (
        <button onClick={removeStar}>Starred</button>
      ) : (
        <button onClick={addStar}>Not Starred</button>
      )}
    </div>
  );
}

RepositoryView.fragments = {
  repository: gql`
    fragment RepositoryViewRepository on Repository {
      id
      name
      url
      viewerHasStarred
    }
  `,
};

export default compose(
  graphql(
    gql`
      mutation AddStarMutation($input: AddStarInput!) {
        addStar(input: $input) {
          starrable {
            id
            viewerHasStarred
          }
        }
      }
    `,
    {
      name: 'addStar',
      options: (props) => ({
        variables: {
          input: {
            starrableId: props.repository.id,
          },
        },
      }),
    },
  ),
  graphql(
    gql`
      mutation RemoveStarMutation($input: RemoveStarInput!) {
        removeStar(input: $input) {
          starrable {
            id
            viewerHasStarred
          }
        }
      }
    `,
    {
      name: 'removeStar',
      options: (props) => ({
        variables: {
          input: {
            starrableId: props.repository.id,
          },
        },
      }),
    },
  ),
)(RepositoryView);
