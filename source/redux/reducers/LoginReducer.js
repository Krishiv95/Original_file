/* Login Reducer
 * handles login states in the app
 */
import CreateReducer from './CreateReducer'

const initialState = {
    data: null,
}

console.log('call loginReducer')

export const LoginReducer = CreateReducer(initialState, {
    ['LOGIN_RESPONSE'] (state, action) {
        console.log('call LOGIN_RESPONSE')
        console.log('state : ', state)
        console.log('action : ', action)
        return {
            data: action.payload,
        }
    },
    ['LOGIN_REQUEST'] (state, action) {
        console.log('call LOGIN_REQUEST')
        console.log('state : ', state)
        console.log('action : ', action)
        return {
            action: action,
        }
    },
})
