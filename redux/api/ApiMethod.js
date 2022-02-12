const {default: APIKit} = require('./ApiKit');
import {Platform, NetInfo} from 'react-native';
let internetStatus = true;
const deviceType = Platform.OS == 'ios' ? 'I' : 'A';
const StatusCodes = {
  Success: 1,
  Failure: 0,
  ServerDown: 2,
  Unauthenticate: 3,
};

export const Method = {
  setInternetConnection(internetConnection) {
    console.log('internetConnection ', internetConnection);
    internetStatus = internetConnection;
  },

  POST(url, body) {
    console.log('post url', url);
    return APIKit.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((data) => {
        console.log('post data', data);
        if (internetStatus === true) {
          if (data.status == 200) {
            if (data.data.responseCode == 1) {
              return {
                status: StatusCodes.Success,
                result: data.data,
              };
            } else {
              return {
                status: StatusCodes.Failure,
                result: data.data,
              };
            }
          } else {
            //check
            return {
              result: {ErrorMsg: 'Something went wrong.'},
              status: StatusCodes.Failure,
            };
          }
        } else {
          return {
            result: {ErrorMsg: 'Please check your internet connection.'},
            status: StatusCodes.Failure,
          };
        }
      })
      .catch((error) => {
        console.log('POST error:  ', error, 'POST error:  &&', error.response);
        if (internetStatus == true) {
          if (error.response == undefined) {
            return {
              result: {ErrorMsg: 'Timeout : server issue'},
              status: StatusCodes.Failure,
            };
          } else {
            if (
              error.response.status == 400 ||
              error.response.status == 401 ||
              error.response.status == 403
            ) {
              return {
                result: {ErrorMsg: 'Session time out.'},
                status: StatusCodes.Unauthenticate,
              };
            } else {
              return {
                result: {ErrorMsg: 'Something went wrong.'},
                status: StatusCodes.Failure,
              };
            }
          }
        } else {
          return {
            result: {
              ErrorMsg: 'Please check your internet connectionn. ',
              internetStatus,
            },
            status: StatusCodes.Failure,
          };
        }
      });
  },

  GET(body, url) {
    console.log('post url', url);
    return APIKit.get(url, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    })
      .then((data) => {
        console.log('get data', data);
        if (internetStatus === true) {
          if (data.status == 200) {
            return {
              status: StatusCodes.Success,
              result: data.data,
            };
          } else {
            return {
              result: {msg: 'Something went wrong.'},
              status: StatusCodes.Failure,
            };
          }
        } else {
          return {
            result: {msg: 'Please check your internet connection.'},
            status: StatusCodes.Failure,
          };
        }
      })
      .catch((error) => {
        console.log('GET error:  ', error, 'GET error:  &&', error.response);
        if (internetStatus == true) {
          if (error.response == undefined) {
            return {
              result: {msg: 'Timeout : server issue'},
              status: StatusCodes.Failure,
            };
          } else {
            if (error.response.status == 400) {
              return {
                result: {msg: error.response.data.message},
                status: StatusCodes.Failure,
              };
            } else {
              return {
                result: {msg: 'Something went wrong.'},
                status: StatusCodes.Failure,
              };
            }
          }
        } else {
          return {
            result: {msg: 'Please check your internet connection.'},
            status: StatusCodes.Failure,
          };
        }
      });
  },
};
