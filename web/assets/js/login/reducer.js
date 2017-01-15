import { LOGIN, LOGIN_START, LOGOUT, REFRESH } from './actionTypes';

const initialState = {
  user: null,
  login: {
    fetching: false,
    invalid: '',
  },
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return Object.assign({}, state, { login: { fetching: true, invalid: '' } });
    case LOGIN: {
      const newState = { login: { fetching: false } };

      newState.login.invalid = action.response.code ? action.response.message : '';

      return Object.assign({}, state, newState);
    }
    case LOGOUT:
      return Object.assign({}, state, { user: null });
    case REFRESH:
      return Object.assign({}, state, { user: action.response.user });
    default:
      return state;
  }
}
