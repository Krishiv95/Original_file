import {put, call} from 'redux-saga/effects'
//import { showMessage } from 'react-native-flash-message';
// import {Login} from '../api/method/Login';
import * as LoginAction from '../actions/LoginAction'
import Constant from '../../theme/Constant'
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalInclude from '../../globalInclude/GlobalInclude';

export function * loginSaga (action) {
    const Login = async (url, payload) => {
        console.log('call loginSaga : ', action)

        console.log('url : ', url)
        console.log('payload : ', payload)

        let responce = []

        try {
            const response = await fetch(Constant.baseURL + url, {
                method: 'POST',
                body: payload,
                // headers: headers,
            })
            let responseJson = await response.json()

            console.log('Url =>', Constant.baseURL + url)
            console.log('BodyDataJson ==>', JSON.stringify(payload))
            // console.log('BodyDataString ==>', loginString);
            console.log('responseJson => ', responseJson.subscriber_id)

            GlobalInclude.AsyncStorage.setItem('loginstatus', JSON.stringify(responseJson.subscriber_id));

            responce.push(responseJson)
            return responce[0]
        } catch (err) {
            responce.push(err)
            console.log('error', err)
            return responce[0]
        }
    }

    const response = yield call(Login, action.url, action.payload)
    console.warn('response saga', response)
    yield put(LoginAction.LoginResponse(response))
    action.navigation.replace('WorkSpace')
}
