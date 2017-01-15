import expect from 'expect';

import reducer from './../../../login/reducer';
import * as types from './../../../login/actionTypes';

describe('user update reducer', () => {
  it('initializes itself', () => {
    expect(reducer(undefined, {})).toEqual({
      user: null,
      login: {
        fetching: false,
        invalid: '',
      },
    });
  });

  it('handles login start', () => {
    expect(reducer({
      user: null,
      login: {
        fetching: false,
        invalid: '',
      },
    }, {
      type: types.LOGIN_START,
    })).toEqual({
      user: null,
      login: {
        fetching: true,
        invalid: '',
      },
    });
  });

  it('handles invalid login', () => {
    expect(reducer({
      user: null,
      login: {
        fetching: true,
        invalid: '',
      },
    }, {
      type: types.LOGIN,
      response: { code: 401, message: 'reason' },
    })).toEqual({
      user: null,
      login: {
        fetching: false,
        invalid: 'reason',
      },
    });
  });

  it('handles valid login', () => {
    expect(reducer({
      user: null,
      login: {
        fetching: true,
        invalid: '',
      },
    }, {
      type: types.LOGIN,
      response: { token: 'asd' },
    })).toEqual({
      user: null,
      login: {
        fetching: false,
        invalid: '',
      },
    });
  });

  it('handles logout', () => {
    expect(reducer({
      user: { id: 1, username: 'asd' },
      login: {
        fetching: false,
        invalid: '',
      },
    }, {
      type: types.LOGOUT,
    })).toEqual({
      user: null,
      login: {
        fetching: false,
        invalid: '',
      },
    });
  });

  it('handles user refresh', () => {
    expect(reducer({
      user: null,
      login: {
        fetching: false,
        invalid: '',
      },
    }, {
      type: types.REFRESH,
      response: { user: { id: 1, username: 'asd' } },
    })).toEqual({
      user: { id: 1, username: 'asd' },
      login: {
        fetching: false,
        invalid: '',
      },
    });
  });
});
