// @flow

import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCodeBranch, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import styled from 'react-emotion';

const RepositoryLink = styled('a')`
  word-break: break-word;
`;

type Props = {
  repository: Object,
  addStar: Function,
  removeStar: Function,
};

function RepositoryView(props: Props) {
  const { repository, addStar, removeStar } = props;
  const { nameWithOwner, url, viewerHasStarred, description, issues, pullRequests } = repository;

  return (
    <>
      <Row className="mb-3">
        <Col>
          <RepositoryLink href={url}>{nameWithOwner}</RepositoryLink>
          <div className="mt-2 d-block d-sm-none" />
          <span className="ml-2 d-none d-sm-inline" />
          <FontAwesomeIcon icon={faCodeBranch} /> {issues.totalCount}
          <FontAwesomeIcon icon={faExclamationTriangle} className="ml-2" />{' '}
          {pullRequests.totalCount}
        </Col>
        <Col style={{ textAlign: 'right' }}>
          {viewerHasStarred ? (
            <Button onClick={removeStar} color="warning">
              <FontAwesomeIcon icon={faStar} /> Starred
            </Button>
          ) : (
            <Button onClick={addStar} color="primary">
              <FontAwesomeIcon icon={faStarRegular} /> Star
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{description || <i>No description available.</i>}</p>
        </Col>
      </Row>
    </>
  );
}

RepositoryView.fragments = {
  repository: gql`
    fragment RepositoryViewRepository on Repository {
      id
      nameWithOwner
      url
      viewerHasStarred
      description
      issues {
        totalCount
      }
      pullRequests {
        totalCount
      }
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
            __typename
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
        optimisticResponse: {
          __typename: 'Mutation',
          addStar: {
            __typename: 'AddStarPayload',
            starrable: {
              id: props.repository.id,
              __typename: 'Repository',
              viewerHasStarred: true,
            },
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
        optimisticResponse: {
          __typename: 'Mutation',
          removeStar: {
            __typename: 'AddStarPayload',
            starrable: {
              id: props.repository.id,
              __typename: 'Repository',
              viewerHasStarred: false,
            },
          },
        },
      }),
    },
  ),
)(RepositoryView);
