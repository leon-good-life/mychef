import { combineReducers } from 'redux';
import dishes from './dishes';
import user from './user';
import admin from './admin';

const rootReducer = combineReducers({
  dishes,
  user,
  admin
});

export default rootReducer;