import Api from '../index'
import ApiConstants from '../../types/ApiConstants'

export function Login (username, password, fcmToken) {
    return Api(
        ApiConstants.LOGIN,
        {
            email: username,
            password: password,
            fcmToken: fcmToken,
        },
        'POST',
        null,
    )
}
