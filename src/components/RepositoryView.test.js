import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import RepositoryView from './RepositoryView';

// jest.mock('react-router-dom', () => ({
//   Link: 'div',
// }));

// jest.mock('react-redux', () => ({
//   connect: () => (C) => C,
// }));

it('matches snapshot', () => {
  const repository = {
    id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
    nameWithOwner: 'facebook/react',
    url: 'https://github.com/facebook/react',
    viewerHasStarred: true,
    description:
      'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    hasIssuesEnabled: true,
    issues: { totalCount: 6373, __typename: 'IssueConnection' },
    pullRequests: { totalCount: 7262, __typename: 'PullRequestConnection' },
    stargazers: { totalCount: 112426, __typename: 'StargazerConnection' },
    __typename: 'Repository',
  };

  const renderer = TestRenderer.create(
    <MockedProvider>
      <RepositoryView repository={repository} />
    </MockedProvider>,
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});
