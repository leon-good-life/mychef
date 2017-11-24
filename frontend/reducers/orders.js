import * as ActionTypes from '../actions/types/orders'

const defaultState = {
  orders: [],
  isProcessingRequest: false
}

const ordersReducer = (state = defaultState, action) => {
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

    default:
      return state
  }
}

export default ordersReducer
