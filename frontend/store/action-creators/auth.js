import * as ActionTypes from '../action-types/auth'

export const loginSuccess = (token, profile) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  token,
  profile
})

export const logoutSuccess = () => ({
  type: ActionTypes.LOGOUT_SUCCESS
})
