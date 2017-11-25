import * as ActionTypes from '../actions/types/admin'

const defaultState = {
  users: [],
  isProcessingRequest: false
}

const admin = (state = defaultState, action) => {
  switch (action.type) {
    /*
      fetch users
    */

    case ActionTypes.FETCH_USERS_REQUEST:
      return {
        users: Array.from(state.users),
        isProcessingRequest: true
      }
      break
    case ActionTypes.FETCH_USERS_SUCCESS:
      return {
        users: action.users,
        isProcessingRequest: false
      }
      break
    case ActionTypes.FETCH_USERS_ERROR:
      return {
        users: Array.from(state.users),
        isProcessingRequest: false
      }
      break

    /*
      verify user
    */

    case ActionTypes.VERIFY_USER_REQUEST:
      return {
        users: Array.from(state.users),
        isProcessingRequest: true
      }
      break
    case ActionTypes.VERIFY_USER_SUCCESS:
      return {
        users: Array.from(state.users),
        isProcessingRequest: false
      }
      break
    case ActionTypes.VERIFY_USER_ERROR:
      return {
        users: Array.from(state.users),
        isProcessingRequest: false
      }
      break

    default:
      return state
  }
}

export default admin
