import { combineReducers } from 'redux';
import dishes from './dishes';
import users from './users';

const rootReducer = combineReducers({
  dishes,
  users
});

export default rootReducer;