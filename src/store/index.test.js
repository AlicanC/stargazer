import uuidv4 from 'uuid/v4';

import createApplicationStore from '.';

it('initializes with empty token', () => {
  const store = createApplicationStore();

  expect(store.getState().token).toBeFalsy();
});

it('can manage user', () => {
  const store = createApplicationStore();

  const token = uuidv4();
  store.dispatch.login(token);

  expect(store.getState().token).toBe(token);

  store.dispatch.logout();

  expect(store.getState().token).toBeFalsy();
});
