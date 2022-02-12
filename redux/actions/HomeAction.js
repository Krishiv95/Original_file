import * as types from '../types/Type';

export function requestHome() {
  
  
  return {
    type: types.HOME_REQUEST,
  };
}

export function onHomeResponse(response) {
  return {
    type: types.HOME_RESPONSE,
    response,
  };
}