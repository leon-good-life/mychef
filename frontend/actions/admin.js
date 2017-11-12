import * as ActionTypes from './types/admin';
import * as Ajax from '../ajax/admin'; 

/*
  Admin fetch users
*/

export const adminFetchUsersRequest = () => ({ 
  type: ActionTypes.ADMIN_FETCH_USERS_REQUEST 
});

export const adminFetchUsersSuccess = (users) => ({ 
  type: ActionTypes.ADMIN_FETCH_USERS_SUCCESS, 
  users
});

export const adminFetchUsersError = (error) => ({ 
  type: ActionTypes.ADMIN_FETCH_USERS_ERROR, 
  error 
});

export const adminFetchUsers = (token) => ((dispatch) => {
  dispatch(adminFetchUsersRequest());
  return Ajax.adminGetUsers(token).then(
    users => dispatch(adminFetchUsersSuccess(users)),
    error => dispatch(adminFetchUsersError(error))
  );
});

/*
  Admin verify user
*/

export const adminVerifyUserRequest = () => ({ 
  type: ActionTypes.ADMIN_VERIFY_USER_REQUEST 
});

export const adminVerifyUserSuccess = () => ({ 
  type: ActionTypes.ADMIN_VERIFY_USER_SUCCESS
});

export const adminVerifyUserError = (error) => ({ 
  type: ActionTypes.ADMIN_VERIFY_USER_ERROR, 
  error 
});

export const adminVerifyUser = (id, token) => ((dispatch) => {
  dispatch(adminVerifyUserRequest());
  return Ajax.adminVerifyUser(id, token).then(
    () => dispatch(adminVerifyUserSuccess()),
    error => dispatch(adminVerifyUserError(error))
  );
});