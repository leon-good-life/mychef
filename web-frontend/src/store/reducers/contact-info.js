// action
const BEGIN_FETCH_CONTACT = 'BEGIN_FETCH_CONTACT';
const FETCH_CONTACT_SUCCESS = 'FETCH_CONTACT_SUCCESS';
const FETCH_CONTACT_ERROR = 'FETCH_CONTACT_ERROR';

const contactInfo = (state = {contact: null, isFetching: false}, action) => {
  switch(action.type){
    case BEGIN_FETCH_CONTACT:
      return {
        isFetching: true,
        contact: [...state.contact]
      };
      break;
    case FETCH_CONTACT_SUCCESS:
      return {
        isFetching: false,
        contact: action.contact
      };
      break;
    case FETCH_CONTACT_ERROR:
      return Object.assign({}, state);
      break;
    default:
      return state;
  }
};