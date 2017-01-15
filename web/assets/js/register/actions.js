import 'es6-promise';
import 'whatwg-fetch';

import { replace } from 'react-router-redux';
import { REGISTER, REGISTER_START } from './actionTypes';

function registerStart() {
  return {
    type: REGISTER_START,
  };
}

function registerHandle(response) {
  return {
    type: REGISTER,
    response,
  };
}


export function register(username, password) {
  return (dispatch) => {
    dispatch(registerStart());

    return fetch(`${baseURL}/auth/register`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(response => response.json())
      .then((json) => {
        dispatch(registerHandle(json));
        if (!json.message) {
          dispatch(replace('login'));
        }
      });
  };
}
