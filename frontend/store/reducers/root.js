import { combineReducers } from 'redux'
import dishes from './dishes'
import user from './user'
import admin from './admin'
import auth from './auth'
import ui from './ui'

const rootReducer = combineReducers({
  dishes,
  user,
  admin,
  auth,
  ui
})

export default rootReducer
