import * as ActionTypes from '../actions/types/auth'

const defaultState = {
  isLoggedIn: false,
  token: null,
  profile: null
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        token: action.token,
        profile: action.profile
      }
      break

    case ActionTypes.LOGOUT_SUCCESS:
      return {
        isLoggedIn: false,
        token: null,
        profile: null
      }
      break

    default:
      return Object.assign({}, state)
      break
  }
}

export default auth
