import Api from '../Api2';
import ApiConstants from '../../types/ApiConstants';

export function Home(username, password,fcmToken) {
  return Api(
    ApiConstants.HOME,
    {
      'email': username,
      'password': password,
      'fcmToken': fcmToken,
    },
    'POST',
    null
  );
}