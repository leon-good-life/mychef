import { combineReducers } from 'redux'
import dishes from './dishes'
import orders from './orders'
import user from './user'
import admin from './admin'
import auth from './auth'
import ui from './ui'

const rootReducer = combineReducers({
  dishes,
  orders,
  user,
  admin,
  auth,
  ui
})

export default rootReducer
