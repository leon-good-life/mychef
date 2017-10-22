import { combineReducers } from 'redux';
import dishes from './dishes';
import contactInfo from './contact-info';

const rootReducer = combineReducers({
  dishes,
  contactInfo
});

export default rootReducer;