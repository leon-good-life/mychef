import * as ActionTypes from '../action-types/user'

const defaultState = {
  user: null,
  isProcessingRequest: false
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    /*
      Create user
    */

    case ActionTypes.CREATE_USER_REQUEST:
      return {
        user: Object.assign({}, state.user),
        isProcessingRequest: true
      }
      break
    case ActionTypes.CREATE_USER_SUCCESS:
      return {
        user: Object.assign({}, state.user),
        isProcessingRequest: false
      }
      break
    case ActionTypes.CREATE_USER_ERROR:
      return {
        user: Object.assign({}, state.user),
        isProcessingRequest: false
      }
      break

    /*
      Fetch user
    */

    case ActionTypes.FETCH_USER_REQUEST:
      return {
        user: Object.assign({}, state.user),
        isProcessingRequest: true
      }
      break
    case ActionTypes.FETCH_USER_SUCCESS:
      return {
        user: action.user,
        isProcessingRequest: false
      }
      break
    case ActionTypes.FETCH_USER_ERROR:
      return {
        user: Object.assign({}, state.user),
        isProcessingRequest: false
      }
      break

    /*
      Update user
    */

    case ActionTypes.UPDATE_USER_REQUEST:
      return {
        user: Object.assign({}, state.user),
        isProcessingRequest: true
      }
      break
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        user: action.user,
        isProcessingRequest: false
      }
      break
    case ActionTypes.UPDATE_USER_ERROR:
      return {
        user: Object.assign({}, state.user),
        isProcessingRequest: false
      }
      break

    default:
      return state
  }
}

export default userReducer
