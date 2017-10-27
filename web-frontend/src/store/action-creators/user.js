import * as UserTypes from '../action-types/user';
import * as UserAjax from '../ajax/user';

export const getUserRequest = () => ({ 
  type: UserTypes.GET_USER_REQUEST 
});

export const getUserSuccess = (user) => ({ 
  type: UserTypes.GET_USER_SUCCESS, 
  user 
});

export const getUserError = (error) => ({ 
  type: UserTypes.GET_USER_ERROR, 
  error 
});

export const getUser = (token) => ((dispatch) => {
  dispatch(getUserRequest());
  return UserAjax.getUser(token).then(
    user => dispatch(getUserSuccess(user)),
    error => dispatch(getUserError(error))
  );
});