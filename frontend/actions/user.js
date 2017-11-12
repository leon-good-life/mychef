import * as ActionTypes from './types/user'
import * as Ajax from '../ajax/user'

/*
  Create user
*/

export const createUserRequest = () => ({
  type: ActionTypes.CREATE_USER_REQUEST
})

export const createUserSuccess = user => ({
  type: ActionTypes.CREATE_USER_SUCCESS,
  user
})

export const createUserError = error => ({
  type: ActionTypes.CREATE_USER_ERROR,
  error
})

export const createUser = token => dispatch => {
  dispatch(createUserRequest())
  return Ajax.createUser(token).then(
    user => dispatch(createUserSuccess(user)),
    error => dispatch(createUserError(error))
  )
}

/*
  Fetch user
*/

export const fetchUserRequest = () => ({
  type: ActionTypes.FETCH_USER_REQUEST
})

export const fetchUserSuccess = user => ({
  type: ActionTypes.FETCH_USER_SUCCESS,
  user
})

export const fetchUserError = error => ({
  type: ActionTypes.FETCH_USER_ERROR,
  error
})

export const fetchUser = token => dispatch => {
  dispatch(fetchUserRequest())
  return Ajax.fetchUser(token).then(
    user => dispatch(fetchUserSuccess(user)),
    error => dispatch(fetchUserError(error))
  )
}

/*
  Update user
*/

export const updateUserRequest = () => ({
  type: ActionTypes.UPDATE_USER_REQUEST
})

export const updateUserSuccess = user => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
  user
})

export const updateUserError = error => ({
  type: ActionTypes.UPDATE_USER_ERROR,
  error
})

export const updateUser = (
  name,
  email,
  telephone,
  address,
  token
) => dispatch => {
  dispatch(updateUserRequest())
  return Ajax.updateUser(name, email, telephone, address, token).then(
    user => dispatch(updateUserSuccess(user)),
    error => dispatch(updateUserError(error))
  )
}
