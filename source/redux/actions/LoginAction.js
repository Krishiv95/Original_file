export function LoginResponse (data) {
    console.log('call SaveLoginResponse : ', data)

    return {
        type: 'LOGIN_RESPONSE',
        payload: data,
    }
}

export function LoginRequest (url, data, navigation) {
    console.log('call SaveLoginResponse : ', data)

    return {
        type: 'LOGIN_REQUEST',
        url: url,
        payload: data,
        navigation: navigation,
    }
}
