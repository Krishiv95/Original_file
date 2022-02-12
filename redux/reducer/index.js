import {combineReducers} from 'redux';
import {loginReducer} from './AuthenticationReducer';

import {LoginReducer} from './LoginReducer';

const appReducer = combineReducers({
  loginReducer,
  LoginReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'API_LOGOUT_SUCCESS') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
