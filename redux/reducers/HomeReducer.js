/* Login Reducer
 * handles login states in the app
 */
import CreateReducer from './CreateReducer';
import * as types from '../types/Type';

const initialState = {
  isLoggedIn: false,
  res: {},
};

export const HomeReducer = CreateReducer(initialState, {
  [types.HOME_REQUEST](state, action) {
    return {
      ...state,
    };
  },
  [types.HOME_RESPONSE](state, action) {
    return {
      ...state,
      isLoggedIn: true,
      res: action.response,
    };
  },
});
