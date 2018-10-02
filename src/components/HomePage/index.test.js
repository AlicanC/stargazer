import React from 'react';
import TestRenderer from 'react-test-renderer';

import HomePage from '.';

jest.mock('react-router-dom', () => ({
  Link: 'div',
}));

jest.mock('react-redux', () => ({
  connect: () => (C) => C,
}));

it('matches snapshot', () => {
  const renderer = TestRenderer.create(<HomePage />);

  expect(renderer.toJSON()).toMatchSnapshot();
});
