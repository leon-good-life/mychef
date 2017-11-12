import * as ActionTypes from '../actions/types/ui'

const defaultState = {
  language: 'en'
}

const ui = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_LANGUAGE:
      return {
        language: action.language
      }
      break

    /*
      Fetch public dishes
    */

    case ActionTypes.FETCH_PUBLIC_DISHES_REQUEST:
      return Object.assign({}, state, {
        isProcessingRequest: true
      })
      break
    case ActionTypes.FETCH_PUBLIC_DISHES_SUCCESS:
      return Object.assign({}, state, {
        isProcessingRequest: false,
        dishes: action.dishes
      })
      break
    case ActionTypes.FETCH_PUBLIC_DISHES_ERROR:
      return Object.assign({}, state, {
        isProcessingRequest: false
      })
      break

    default:
      return Object.assign({}, state)
      break
  }
}

export default ui
