import * as ActionTypes from './types/customer'
import * as Ajax from '../ajax/customer'

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

/*
  Fetch dishes
*/

export const fetchDishesRequest = () => ({
  type: ActionTypes.FETCH_DISHES_REQUEST
})

export const fetchDishesSuccess = dishes => ({
  type: ActionTypes.FETCH_DISHES_SUCCESS,
  dishes
})

export const fetchDishesError = error => ({
  type: ActionTypes.FETCH_DISHES_ERROR,
  error
})

export const fetchDishes = token => (dispatch, getState) => {
  dispatch(fetchDishesRequest())
  return Ajax.getDishes(token).then(
    dishes => dispatch(fetchDishesSuccess(dishes)),
    error => dispatch(fetchDishesError(error))
  )
}
