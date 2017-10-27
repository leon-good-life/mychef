import * as DishesAjax from '../ajax/dishes';

export const GET_DISHES_REQUEST = 'GET_DISHES_REQUEST';
export const getDishesRequest = () => ({ action: GET_DISHES_REQUEST });

export const GET_DISHES_SUCCESS = 'GET_DISHES_SUCCESS';
export const getDishesSuccess = (dishes) => ({ action: GET_DISHES_SUCCESS, dishes });

export const GET_DISHES_ERROR = 'GET_DISHES_ERROR';
export const getDishesError = (error) => ({ action: GET_DISHES_ERROR, error });

export const GET_DISHES = 'GET_DISHES';
export const getDishes = (token) => ((dispatch) => {
  dispatch(getDishesRequest());
  return DishesAjax.getDishes(token).then(
    dishes => dispatch(getDishesSuccess(dishes)),
    error => dispatch(getDishesError(error))
  );
});