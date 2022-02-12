import {put, call} from 'redux-saga/effects';
//import { showMessage } from 'react-native-flash-message';
import {Home} from '../api/method/Home';
import * as HomeAction from '../actions/HomeAction';
    
console.log('call loginsaga');

export function* homeAsync(action) {

  //yield put(loginActions.enableLoader());
  const response = yield call(
    Home,
  );
  console.warn('response', response);
  yield put(HomeAction.onHomeResponse(response));
//   action.navigation.navigate('DrawerNavigator');
}
