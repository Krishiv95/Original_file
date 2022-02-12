import {put, call} from 'redux-saga/effects';
import {Login, SignUp, logout, edit} from '../api/index';
import {constant} from '../actionTypes';
import {DataManager} from '../support/DataManager';

export function* loginSaga(action) {
  console.log('action login saga', action.email, action.password);
  try {
    let response = yield call(Login, action.email, action.password);
    console.log('login saga response ===> ', response);
    let result = response.result;
    if (response.status === 1) {
      DataManager.setAccessToken(result.data.sessid);
      yield put({
        type: constant.API_LOGIN_SUCESS,
        result: result.data,
        navigation: action.navigation.navigate('DrawerNavigator'),
      });
    } else {
      yield put({type: constant.API_LOGIN_FAIL});
      setTimeout(() => {
        alert(result.message);
      }, 100);
    }
  } catch (error) {
    console.log('error==>', error);
    yield put({type: constant.API_LOGIN_ERROR});
    // setTimeout(() => {
    //     alert(error.result.msg)
    // }, 500)
  }
}

export function* signUpSaga(action) {
  console.log('action signup saga', action);
  try {
    let response = yield call(
      SignUp,
      action.fullName,
      action.email,
      action.contactNo,
      action.password,
      action.confirmPassword,
    );
    console.log('SIGNUP saga RESPONSE', response);
    let result = response.result;
    if (response.status === 1) {
      DataManager.setAccessToken();
      console.log('coming', action);

      yield put({
        type: constant.API_SIGNUP_SUCESS,
        result: result.data,
        navigation: action.navigation.navigate('Login'),
      });
    } else {
      yield put({type: constant.API_SIGNUP_FAIL});
      setTimeout(() => {
        alert(result.message);
      }, 100);
    }
  } catch (error) {
    yield put({type: constant.API_SIGNUP_ERROR});
  }
}
export function* logoutSaga(action) {
  try {
    let response = yield call(logout, action.ssid);
    console.log('login saga RESPONSE', response);
    if (response.status === 1) {
      console.log('coming', action);

      yield put({type: 'API_LOGOUT_SUCCESS'});
    } else {
      yield put({type: 'API_LOGOUT_FAIL'});
      setTimeout(() => {
        alert(result.message);
      }, 100);
    }
  } catch (error) {
    yield put({type: 'API_LOGOUT_ERROR'});
    // setTimeout(() => {
    //     alert(error.result.msg)
    // }, 500)
  }
}
export function* editSaga(action) {
  try {
    console.log('edit saga');
    let response = yield call(
      edit,
      action.fullName,
      action.email,
      action.mobileNo,
      action.currentPassword,
      action.setNewPassword,
    );
    console.log('login saga', response);
    let result = response.result;
    if (response.status === 1) {
      yield put({
        type: constant.API_EDIT_SUCESS,
        result: result.data,
        navigation: action.navigation.goBack(),
      });
    } else {
      yield put({type: constant.API_EDIT_FAIL});
      setTimeout(() => {
        alert(result.message);
      }, 100);
    }
  } catch (error) {
    yield put({type: constant.API_EDIT_ERROR});
  }
}
