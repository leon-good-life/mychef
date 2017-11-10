import * as ActionTypes from '../action-types/ui'

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
    default:
      return Object.assign({}, state)
      break
  }
}

export default ui
