import {DataManager} from '../support/DataManager'
import {Method} from './ApiMethod'

export const Login = (email, password) => {
    console.log('login parms==>', email, password)
    return Method.POST('login', {
        email: email,
        password: password,
    })
}
export const SignUp = (
    fullName,
    email,
    contactNo,
    password,
    confirmPassword,
) => {
    console.log(
        'api data==>',
        'fullName -',
        fullName,
        'email-',
        email,
        'contactNo-',
        contactNo,
        'password-',
        password,
        'confirmPassword-',
        confirmPassword,
    )
    let body = new FormData()
    return Method.POST('register', {
        full_name: fullName,
        password: password,
        confirm: confirmPassword,
        email: email,
        phone: contactNo,
        gender: 1,
        date_of_birth: '1985-05-22',
        uuid: '',
        token: '',
        name: '',
    })
}

export const edit = async (
    fullName,
    email,
    contactNo,
    password,
    confirmPassword,
) => {
    // let body = new FormData()
    let token = await DataManager.getAccessToken()
    let parseT = await JSON.parse(token)
    return Method.POST('updateprofile', {
        sessid: parseT,
        full_name: fullName,
        password: password,
        confirm: confirmPassword,
        email: email,
        phone: contactNo,
        gender: 1,
        date_of_birth: '1985-05-22',
        uuid: '',
        token: '',
        name: '',
    })
    // return Method.POST('User/EditUser', { 'Email': email, 'FirstName': name, 'ID': id })
}
export const logout = id => {
    let body = new FormData()
    return Method.POST('logout', {sessid: id})
}
