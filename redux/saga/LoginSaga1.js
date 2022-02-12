import {put, call} from 'redux-saga/effects';
//import { showMessage } from 'react-native-flash-message';
import {Login} from '../api/method/Login';
import * as LoginAction from '../actions/LoginAction';
    
console.log('call loginsaga');

export function* loginAsync(action) {

  console.log('call loginAsync');

  //yield put(loginActions.enableLoader());
  const response = yield call(
    Login,
    action.username,
    action.password,
    action.fcmToken,
  );
  console.warn('response', response);
  yield put(LoginAction.onLoginResponse(response));
  action.navigation.navigate('DrawerNavigator');
}
