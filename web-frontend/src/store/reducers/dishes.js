import * as ActionTypes from '../action-types/dishes';

const dishes = (state = {dishes: [], isFetching: false}, action) => {
  switch(action.type){
    case ActionTypes.GET_DISHES_REQUEST:
      return {
        isFetching: true,
        dishes: [...state.dishes]
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
    default:
      return state;
  }
};

export default dishes;