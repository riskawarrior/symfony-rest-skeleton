import expect from 'expect';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from './../../../register/actions';
import * as types from './../../../register/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('register action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('performs a registration', () => {
    fetchMock.post('localhost/auth/register', []);

    const expectedActions = [
      { type: types.REGISTER_START },
      { type: types.REGISTER, response: [] },
      { type: '@@router/CALL_HISTORY_METHOD', payload: { args: ['login'], method: 'replace' } },
    ];
    const store = mockStore({ user: null });

    return store.dispatch(actions.register('asd', 'asd'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('gives error on login error', () => {
    fetchMock.post('localhost/auth/register', { message: "Something is invalid!" });

    const expectedActions = [
      { type: types.REGISTER_START },
      { type: types.REGISTER, response: { message: "Something is invalid!" } },
    ];
    const store = mockStore({ user: null });

    return store.dispatch(actions.register('asd', 'asd'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
