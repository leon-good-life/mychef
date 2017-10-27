import * as ActionTypes from '../action-types/user';

const user = (state = {contact: null, isFetching: false}, action) => {
  switch(action.type){
    case ActionTypes.GET_USER_REQUEST:
      return {
        isFetching: true,
        contact: [...state.contact]
      };
      break;
    case ActionTypes.GET_USER_SUCCESS:
      return {
        isFetching: false,
        contact: action.contact
      };
      break;
    case ActionTypes.GET_USER_ERROR:
      return Object.assign({}, state);
      break;
    default:
      return state;
  }
};

export default user;