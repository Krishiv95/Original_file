import {takeEvery, takeLatest} from 'redux-saga/effects';
import {constant} from '../actionTypes';
import {
  
  loginSaga,
} from './LoginSaga';

import {LoginSaga} from './LoginSaga'

export default function* root_saga() {
  yield takeEvery('LOGIN_REQUEST', loginSaga);
}
