const {constant} = require('../actionTypes');

const initialState = {
  onLoad: false,
  error: null,
  userResult: null,
  navigation: null,
  status: 0,
  statusR: 0,
  email: '',
  password: '',
  verifyS: 0,
};

// LOGIN REDUCER
function loginReducer(state = initialState, action) {
  switch (action.type) {
    case constant.API_LOGIN_LOAD:
      console.log('called Login reducer');
      return {...state, onLoad: true};

    case constant.API_LOGIN_SUCESS:
      return {...state, onLoad: false, userResult: action.result};

    case constant.API_LOGIN_FAIL:
      return {...state, onLoad: false};

    case constant.API_LOGIN_ERROR:
      return {...state, onLoad: false};

    case constant.API_SIGNUP_LOAD:
      console.log('called SIGN reducer');
      return {...state, onLoad: true};

    case constant.API_SIGNUP_SUCESS:
      return {...state, onLoad: false, userResult: action.result, status: 1};

    case constant.API_SIGNUP_FAIL:
      return {...state, onLoad: false};

    case constant.API_SIGNUP_ERROR:
      return {...state, onLoad: false};
    case constant.API_OTP_SUCESS:
      return {
        ...state,
        onLoad: false,
        verifyS: action.screen == 'signup' ? 1 : 0,
      };

    case constant.SET_LOADER:
      return {...state, onLoad: action.onLoad};
    default:
      return state;
  }
}

// LOGOUT REDUCER
function logoutReducer(state = initialState, action) {
  switch (action.type) {
    case 'API_LOGOUT_LOAD':
      return {...state, onLoad: true};

    case 'API_LOGOUT_SUCCESS':
      return {...state, onLoad: false};

    case 'API_LOGOUT_FAIL':
      return {...state, onLoad: false};

    case 'API_LOGOUT_ERROR':
      return {...state, onLoad: false};

    default:
      return state;
  }
}

module.exports = {
  loginReducer,
  logoutReducer,
};
