import React from 'react';
import TestRenderer from 'react-test-renderer';

import HuntPage from '.';

jest.mock('react-router-dom', () => ({
  Link: 'div',
}));

jest.mock('react-redux', () => ({
  connect: () => (C) => C,
}));

it('matches snapshot', () => {
  const renderer = TestRenderer.create(<HuntPage />);

  expect(renderer.toJSON()).toMatchSnapshot();
});
