import * as ActionTypes from '../action-types/dishes'

const defaultState = {
  dishes: [],
  isProcessingRequest: false,
  lastTimeFetched: null
}

const dishesReducer = (state = defaultState, action) => {
  const clonedState = Object.assign({}, state, {
    dishes: Array.from(state.dishes)
  })
  switch (action.type) {
    /*
      Create dish
    */

    case ActionTypes.CREATE_DISH_REQUEST:
      return Object.assign({}, clonedState, {
        isProcessingRequest: true
      })
      break
    case ActionTypes.CREATE_DISH_SUCCESS:
      return Object.assign({}, clonedState, {
        isProcessingRequest: false
      })
      break
    case ActionTypes.CREATE_DISH_ERROR:
      return Object.assign({}, clonedState, {
        isProcessingRequest: false
      })
      break

    /*
      Fetch dishes
    */

    case ActionTypes.FETCH_DISHES_REQUEST:
      return Object.assign({}, clonedState, {
        isProcessingRequest: true
      })
      break
    case ActionTypes.FETCH_DISHES_SUCCESS:
      return Object.assign({}, clonedState, {
        isProcessingRequest: false,
        dishes: action.dishes
      })
      break
    case ActionTypes.FETCH_DISHES_ERROR:
      return Object.assign({}, clonedState, {
        isProcessingRequest: false
      })
      break

    /*
      Delete dish
    */

    case ActionTypes.DELETE_DISH_REQUEST:
      return Object.assign({}, clonedState, {
        isProcessingRequest: true
      })
      break
    case ActionTypes.DELETE_DISH_SUCCESS:
      return Object.assign({}, clonedState, {
        isProcessingRequest: false
      })
      break
    case ActionTypes.DELETE_DISH_ERROR:
      return Object.assign({}, clonedState, {
        isProcessingRequest: false
      })
      break

    /*
      Update dish
    */

    case ActionTypes.UPDATE_DISH_REQUEST:
      return Object.assign({}, clonedState, {
        isProcessingRequest: true
      })
      break
    case ActionTypes.UPDATE_DISH_SUCCESS:
      return Object.assign({}, clonedState, {
        isProcessingRequest: false
      })
      break
    case ActionTypes.UPDATE_DISH_ERROR:
      return Object.assign({}, clonedState, {
        isProcessingRequest: false
      })
      break

    /*
      Upload dish image
    */

    case ActionTypes.UPLOAD_DISH_IMAGE_REQUEST:
      return clonedState
      break
    case ActionTypes.UPLOAD_DISH_IMAGE_SUCCESS:
      return clonedState
      break
    case ActionTypes.UPLOAD_DISH_IMAGE_ERROR:
      return clonedState
      break

    /*
      Update dish availability
    */

    case ActionTypes.UPDATE_DISH_AVAILABILITY_REQUEST:
      return clonedState
      break
    case ActionTypes.UPDATE_DISH_AVAILABILITY_SUCCESS:
      return clonedState
      break
    case ActionTypes.UPDATE_DISH_AVAILABILITY_ERROR:
      return clonedState
      break

    default:
      return state
  }
}

export default dishesReducer
