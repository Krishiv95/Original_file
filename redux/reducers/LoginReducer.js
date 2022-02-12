/* Login Reducer
 * handles login states in the app
 */
import CreateReducer from './CreateReducer';
import * as types from '../types/Type';

const initialState = {
  data : null
};

console.log('call loginReducer');

export const LoginReducer = CreateReducer(initialState, {
  
  [types.LOGIN_REQUEST](state, action) {
    console.log('call LoginReducer');
    console.log('state : ',state);
    console.log('action : ',action);
    return {
      data:action.data
    };
  },
  [types.LOGIN_RESPONSE](state, action) {
    var token = action.response.token
    if (token == undefined) {
      token = action.response.user.token
    }
    return {
      ...state,
      token: token,
      isLoggedIn: true,
      user: action.response.user,
      isFromRegister: false
    };
  },
});
