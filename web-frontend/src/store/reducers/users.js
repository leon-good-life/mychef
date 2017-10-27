import { GET_USER_REQUEST, GET_USER_SUCCSESS, GET_USER_ERROR } from '../actions/users';

export const users = (state = {contact: null, isFetching: false}, action) => {
  switch(action.type){
    case GET_USER_REQUEST:
      return {
        isFetching: true,
        contact: [...state.contact]
      };
      break;
    case GET_USER_SUCCSESS:
      return {
        isFetching: false,
        contact: action.contact
      };
      break;
    case GET_USER_ERROR:
      return Object.assign({}, state);
      break;
    default:
      return state;
  }
};