import { combineReducers } from "redux";

import {LoginReducer} from './LoginReducer';
import {HomeReducer} from './HomeReducer';
// import {FeedbackReducer} from './FeedbackReducer';

export default combineReducers({
    LoginReducer,
    HomeReducer,
//   FeedbackReducer
});