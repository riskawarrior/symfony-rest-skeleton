import home from './home';
import login from './login';
import register from './register';

import { App } from './components';

export const routes = {
  childRoutes: [{
    path: '/',
    component: App,
    indexRoute: {
      component: home.components.Home,
    },
    childRoutes: [
      login.routes,
      register.routes,
    ],
  }],
};
