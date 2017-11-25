import { combineReducers } from 'redux'
import chef from './chef'
import customer from './customer'
import admin from './admin'
import auth from './auth'

const rootReducer = combineReducers({
  chef,
  customer,
  admin,
  auth
})

export default rootReducer
