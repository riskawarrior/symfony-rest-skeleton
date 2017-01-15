import login from './login';
import register from './register';

export default {
  [login.constants.NAME]: login.reducer,
  [register.constants.NAME]: register.reducer,
};
