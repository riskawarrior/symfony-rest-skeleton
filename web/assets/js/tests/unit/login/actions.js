import expect from 'expect';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from './../../../login/actions';
import * as types from './../../../login/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('performs a login', () => {
    fetchMock.post('localhost/auth/login', { body: { token: 'asdasd' } });
    fetchMock.get('localhost/auth/is_signed_in', {
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@domain.com',
        enabled: true,
        roles: [
          'ROLE_SUPER_ADMIN',
        ],
      },
    });

    const expectedActions = [
      { type: types.LOGIN_START },
      { type: types.LOGIN, response: { token: 'asdasd' } },
      { type: '@@router/CALL_HISTORY_METHOD', payload: { args: ['/'], method: 'replace' } },
    ];
    const store = mockStore({ user: null });

    return store.dispatch(actions.login('asd', 'asd'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('gives error on login error', () => {
    fetchMock.post('localhost/auth/login', { body: { code: 401, message: 'Invalid credentials' }, status: 401 });

    const expectedActions = [
      { type: types.LOGIN_START },
      { type: types.LOGIN, response: { code: 401, message: 'Invalid credentials' } },
    ];
    const store = mockStore({ user: null });

    return store.dispatch(actions.login('asd', 'asd'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('logout action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('performs logout', () => {
    fetchMock.post('localhost/auth/logout', { body: {}, status: 302 });

    const expectedActions = [
      { type: types.LOGOUT },
    ];
    const store = mockStore({ user: { id: 1, username: 'asd' } });

    return store.dispatch(actions.logout())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('refresh action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('returns user', () => {
    fetchMock.get('localhost/auth/is_signed_in', { body: { user: { id: 1, username: 'asd' } } });

    const expectedActions = [
      { type: types.REFRESH, response: { user: { id: 1, username: 'asd' } } },
    ];
    const store = mockStore({ user: null });

    return store.dispatch(actions.refresh())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
