import AsyncStorage from '@react-native-async-storage/async-storage';
import {localKeys} from './DataManagerKeys'
export const DataManager = {


    setAccessToken(token) {
        console.log('token',token);
        AsyncStorage.setItem('accessToken', JSON.stringify(token))
    },

    getAccessToken() {
        try {
            return AsyncStorage.getItem("accessToken").then((token) => {
                return token
            })
        }
        catch (error) {
        }
    },

    setUserDetail(data) {
        AsyncStorage.setItem('userDetail', JSON.stringify(data))
    },

    //method to get access token
    getUserDetail() {
        try {
            return AsyncStorage.getItem('userDetail').then((data) => {
                return data
            })
        }
        catch (error) {
        }
    },
    clearData() {
        AsyncStorage.multiRemove(['userDetail', 'accessToken'])
    }
}