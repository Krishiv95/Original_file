// General api to access data
import ApiConstants from '../types/ApiConstants';
export default function api(path, params, method, token) {
  console.log('token =>',token);
  let options;
  options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    method: method,
    ...(params && { body: JSON.stringify(params) }),
  };

  console.log('BASE_URL: APICall ' + (ApiConstants.BASE_URL + path));
  console.log('Body: APICall ' + JSON.stringify(params));
  console.log('method: APICall ' + method);
  console.log('options: APICall ' + options);
  return fetch(ApiConstants.HOME , 'GET')
    .then((resp) => {
      console.log({resp});
      return resp.json();
    })
    .then((json) => {
      console.log('json Responce: ', json);
      return json;
    })
    .catch((error) => {
      console.log('<-- Error::', error);
      return error;
    });
}
