import * as ActionTypes from './types/admin'
import * as Ajax from '../ajax/admin'

/*
  fetch users
*/

export const fetchUsersRequest = () => ({
  type: ActionTypes.FETCH_USERS_REQUEST
})

export const fetchUsersSuccess = users => ({
  type: ActionTypes.FETCH_USERS_SUCCESS,
  users
})

export const fetchUsersError = error => ({
  type: ActionTypes.FETCH_USERS_ERROR,
  error
})

export const fetchUsers = token => dispatch => {
  dispatch(fetchUsersRequest())
  return Ajax.getUsers(token).then(
    users => dispatch(fetchUsersSuccess(users)),
    error => dispatch(fetchUsersError(error))
  )
}

/*
  verify user
*/

export const verifyUserRequest = () => ({
  type: ActionTypes.VERIFY_USER_REQUEST
})

export const verifyUserSuccess = () => ({
  type: ActionTypes.VERIFY_USER_SUCCESS
})

export const verifyUserError = error => ({
  type: ActionTypes.VERIFY_USER_ERROR,
  error
})

export const verifyUser = (id, token) => dispatch => {
  dispatch(verifyUserRequest())
  return Ajax.verifyUser(id, token).then(
    () => dispatch(verifyUserSuccess()),
    error => dispatch(verifyUserError(error))
  )
}
