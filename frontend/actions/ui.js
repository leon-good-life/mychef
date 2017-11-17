import * as ActionTypes from './types/ui'
import * as Ajax from '../ajax/dishes'

/*
  Fetch public dishes
*/

export const fetchPublicDishesRequest = () => ({
  type: ActionTypes.FETCH_PUBLIC_DISHES_REQUEST
})

export const fetchPublicDishesSuccess = dishes => ({
  type: ActionTypes.FETCH_PUBLIC_DISHES_SUCCESS,
  dishes
})

export const fetchPublicDishesError = error => ({
  type: ActionTypes.FETCH_PUBLIC_DISHES_ERROR,
  error
})

export const fetchPublicDishes = token => (dispatch, getState) => {
  dispatch(fetchPublicDishesRequest())
  return Ajax.getPublicDishes(token).then(
    dishes => dispatch(fetchPublicDishesSuccess(dishes)),
    error => dispatch(fetchPublicDishesError(error))
  )
}
