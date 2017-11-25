import * as ActionTypes from '../actions/types/customer'

const defaultState = {
  orders: [],
  isProcessingRequest: false
}

const customer = (state = defaultState, action) => {
  const clonedState = Object.assign({}, state, {
    orders: Array.from(state.orders)
  })
  switch (action.type) {
    /*
      Create order
    */

    case ActionTypes.CREATE_ORDER_REQUEST:
      return Object.assign({}, clonedState, {
        isProcessingRequest: true
      })
      break
    case ActionTypes.CREATE_ORDER_SUCCESS:
      return Object.assign({}, clonedState, {
        isProcessingRequest: false
      })
      break
    case ActionTypes.CREATE_ORDER_ERROR:
      return Object.assign({}, clonedState, {
        isProcessingRequest: false
      })
      break

    /*
      Fetch dishes
    */

    case ActionTypes.FETCH_DISHES_REQUEST:
      return Object.assign({}, state, {
        isProcessingRequest: true
      })
      break
    case ActionTypes.FETCH_DISHES_SUCCESS:
      return Object.assign({}, state, {
        isProcessingRequest: false,
        dishes: action.dishes
      })
      break
    case ActionTypes.FETCH_DISHES_ERROR:
      return Object.assign({}, state, {
        isProcessingRequest: false
      })
      break

    default:
      return state
  }
}

export default customer
