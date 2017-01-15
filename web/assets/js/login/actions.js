import 'es6-promise';
import 'whatwg-fetch';

import { replace } from 'react-router-redux';
import { LOGIN, LOGIN_START, LOGOUT, REFRESH } from './actionTypes';

function refreshHandle(response) {
  return {
    type: REFRESH,
    response,
  };
}

function loginStart() {
  return {
    type: LOGIN_START,
  };
}

function loginHandle(response) {
  return {
    type: LOGIN,
    response,
  };
}

function logoutHandle() {
  return {
    type: LOGOUT,
  };
}

export function refresh() {
  return dispatch => fetch(`${baseURL}/auth/is_signed_in`, {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => dispatch(refreshHandle(json)));
}

export function login(username, password) {
  return (dispatch) => {
    dispatch(loginStart());

    return fetch(`${baseURL}/auth/login`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _username: username,
        _password: password,
      }),
    })
      .then(response => response.json())
      .then((json) => {
        dispatch(loginHandle(json));
        if (json.token) {
          dispatch(refresh());
          dispatch(replace('/'));
        }
      });
  };
}

export function logout() {
  return dispatch => fetch(`${baseURL}/auth/logout`, {
    credentials: 'same-origin',
    method: 'POST',
    redirect: 'manual',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(() => dispatch(logoutHandle()));
}
