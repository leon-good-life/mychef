import * as DishesTypes from '../action-types/dishes';
import * as DishesAjax from '../ajax/dishes';


export const getDishesRequest = () => ({ 
  type: DishesTypes.GET_DISHES_REQUEST
});

export const getDishesSuccess = (dishes) => ({ 
  type: DishesTypes.GET_DISHES_SUCCESS, 
  dishes 
});

export const getDishesError = (error) => ({ 
  type: DishesTypes.GET_DISHES_ERROR, 
  error 
});

export const getDishes = (token) => ((dispatch) => {
  dispatch(getDishesRequest());
  return DishesAjax.getDishes(token).then(
    dishes => dispatch(getDishesSuccess(dishes)),
    error => dispatch(getDishesError(error))
  );
});