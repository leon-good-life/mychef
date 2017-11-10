import * as ActionTypes from '../action-types/admin'

const defaultState = {
  adminUsers: null,
  isProcessingRequest: false
}

const adminReducer = (state = defaultState, action) => {
  switch (action.type) {
    /*
      Admin fetch users
    */

    case ActionTypes.ADMIN_FETCH_USERS_REQUEST:
      return {
        adminUsers: Object.assign({}, state.adminUsers),
        isProcessingRequest: true
      }
      break
    case ActionTypes.ADMIN_FETCH_USERS_SUCCESS:
      return {
        adminUsers: action.users,
        isProcessingRequest: false
      }
      break
    case ActionTypes.ADMIN_FETCH_USERS_ERROR:
      return {
        adminUsers: Object.assign({}, state.adminUsers),
        isProcessingRequest: false
      }
      break

    /*
      Admin verify user
    */

    case ActionTypes.ADMIN_VERIFY_USER_REQUEST:
      return {
        adminUsers: Object.assign({}, state.adminUsers),
        isProcessingRequest: true
      }
      break
    case ActionTypes.ADMIN_VERIFY_USER_SUCCESS:
      return {
        adminUsers: Object.assign({}, state.adminUsers),
        isProcessingRequest: false
      }
      break
    case ActionTypes.ADMIN_VERIFY_USER_ERROR:
      return {
        adminUsers: Object.assign({}, state.adminUsers),
        isProcessingRequest: false
      }
      break

    default:
      return state
  }
}

export default adminReducer
