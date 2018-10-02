import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import LoginPage from '.';

jest.mock('react-router-dom', () => ({
  Link: 'div',
}));

jest.mock('react-redux', () => ({
  connect: () => (C) => C,
}));

it('matches snapshot', () => {
  const renderer = TestRenderer.create(
    <MockedProvider>
      <LoginPage />
    </MockedProvider>,
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});
