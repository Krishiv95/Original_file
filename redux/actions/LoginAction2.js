import * as types from '../types/Type';

export function requestLogin(data) {
  console.log('call requestLogin : ',data);
  // console.log('\n',username,'\n',password,'\n',fcmToken,'\n',navigation);
  return {
    type: types.LOGIN_REQUEST,
    data,
  };
}

export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}