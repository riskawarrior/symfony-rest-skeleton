import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { routes } from './routes';

import reducers from './rootReducer';
import login from './login';

require('../sass/style.scss');

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer,
  form: formReducer,
}));

let middlewares;
let DevTools;
if (process.env.NODE_ENV === 'development') {
  DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
      <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
  );

  middlewares = compose(
    applyMiddleware(thunkMiddleware, routerMiddleware(hashHistory)),
    DevTools.instrument()
  );
} else {
  middlewares = applyMiddleware(thunkMiddleware, routerMiddleware(hashHistory));
}
const store = createStore(
  reducer,
  middlewares
);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      {DevTools ? <DevTools /> : null}
    </div>
  </Provider>,
  document.getElementById('react-app')
);

store.dispatch(login.actions.refresh());
