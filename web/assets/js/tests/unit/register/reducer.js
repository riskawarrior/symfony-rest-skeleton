import expect from 'expect';

import reducer from './../../../register/reducer';
import * as types from './../../../register/actionTypes';

describe('user update reducer', () => {
  it('initializes itself', () => {
    expect(reducer(undefined, {})).toEqual({
      register: {
        fetching: false,
        invalid: '',
      },
    });
  });

  it('handles register start', () => {
    expect(reducer({
      register: {
        fetching: false,
        invalid: '',
      },
    }, {
      type: types.REGISTER_START,
    })).toEqual({
      register: {
        fetching: true,
        invalid: '',
      },
    });
  });

  it('handles invalid register', () => {
    expect(reducer({
      register: {
        fetching: true,
        invalid: '',
      },
    }, {
      type: types.REGISTER,
      response: { message: "Something is invalid!" },
    })).toEqual({
      register: {
        fetching: false,
        invalid: 'Something is invalid!',
      },
    });
  });

  it('handles valid register', () => {
    expect(reducer({
      register: {
        fetching: false,
        invalid: '',
      },
    }, {
      type: types.REGISTER,
      response: [],
    })).toEqual({
      register: {
        fetching: false,
        invalid: '',
      },
    });
  });
});
