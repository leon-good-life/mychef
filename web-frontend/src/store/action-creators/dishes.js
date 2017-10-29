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


export const deleteDishRequest = () => ({ 
  type: DishesTypes.DELETE_DISH_REQUEST
});

export const deleteDishSuccess = (dishes) => ({ 
  type: DishesTypes.DELETE_DISH_SUCCESS, 
  dishes 
});

export const deleteDishError = (error) => ({ 
  type: DishesTypes.DELETE_DISH_ERROR, 
  error 
});

export const deleteDish = (id, token) => ((dispatch) => {
  dispatch(deleteDishRequest());
  return DishesAjax.deleteDish(id, token).then(
    dishes => dispatch(deleteDishSuccess()),
    error => dispatch(deleteDishError(error))
  );
});