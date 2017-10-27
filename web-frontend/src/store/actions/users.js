import * as UsersAjax from '../ajax/users';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const getUserRequest = () => ({ action: GET_USER_REQUEST });

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const getUserSuccess = (user) => ({ action: GET_USER_SUCCESS, user });

export const GET_USER_ERROR = 'GET_USER_ERROR';
export const getUserError = (error) => ({ action: GET_USER_ERROR, error });

export const GET_USER = 'GET_USER';
export const getUser = (token) => ((dispatch) => {
  dispatch(getUserRequest());
  return UsersAjax.getUser(token).then(
    user => dispatch(getUserSuccess(user)),
    error => dispatch(getUserError(error))
  );
});