import * as ActionTypes from '../action-types/dishes';

const dishes = (state = {dishes: [], isFetching: false}, action) => {
  let dishes = JSON.parse(JSON.stringify(state.dishes));
  switch(action.type){
    case ActionTypes.GET_DISHES_REQUEST:
      return {
        isFetching: true,
        dishes 
      };
      break;
    case ActionTypes.GET_DISHES_SUCCESS:
      return {
        isFetching: false,
        dishes: action.dishes
      };
      break;
    case ActionTypes.GET_DISHES_ERROR:
      return {
        isFetching: false,
        dishes: []
      };
      break;
    case ActionTypes.DELETE_DISH_REQUEST:
      return {
        deleting: true,
        dishes 
      };
      break;
    case ActionTypes.DELETE_DISH_SUCCESS:
      return {
        deleting: false,
        dishes 
      };
      break;
    case ActionTypes.DELETE_DISH_ERROR:
      return {
        deleting: false,
        error: action.error,
        dishes 
      };
      break;
    default:
      return state;
  }
};

export default dishes;