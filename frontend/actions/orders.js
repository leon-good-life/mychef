import * as ActionTypes from './types/orders'
import * as Ajax from '../ajax/orders'

/*
  Create order
*/

export const createOrderRequest = () => ({
  type: ActionTypes.CREATE_ORDER_REQUEST
})

export const createOrderSuccess = () => ({
  type: ActionTypes.CREATE_ORDER_SUCCESS
})

export const createOrderError = error => ({
  type: ActionTypes.CREATE_ORDER_ERROR,
  error
})

export const createOrder = (dish, token) => dispatch => {
  dispatch(createOrderRequest())
  return Ajax.createOrder(dish, token).then(
    () => dispatch(createOrderSuccess()),
    error => dispatch(createOrderError(error))
  )
}
