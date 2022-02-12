const initialState = {
    userResult: null,
}

function LoginReducer (state = initialState, action) {
    console.log('action : ',action)
    console.log('state : ',state)
    switch (action.type) {
        case 'LoginResponse':
            console.log('called setLoginData')
            return {...state}

        default:
            return state
    }
}

module.exports = {
    LoginReducer,
  };
