import { REGISTER, REGISTER_START } from './actionTypes';

const initialState = {
  register: {
    fetching: false,
    invalid: '',
  },
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case REGISTER_START:
      return Object.assign({}, state, { register: { fetching: true, invalid: '' } });
    case REGISTER: {
      const newState = { register: { fetching: false } };

      newState.register.invalid = action.response.message ? action.response.message : '';

      return Object.assign({}, state, newState);
    }
    default:
      return state;
  }
}
