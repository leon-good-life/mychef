import { combineReducers } from 'redux';
import dishes from './dishes';
import user from './user';

const rootReducer = combineReducers({
  dishes,
  user
});

export default rootReducer;