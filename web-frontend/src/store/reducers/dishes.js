import { GET_DISHES_REQUEST, GET_DISHES_SUCCSESS, GET_DISHES_ERROR } from '../actions/dishes';

export const dishes = (state = {dishes: [], isFetching: false}, action) => {
  switch(action.type){
    case GET_DISHES_REQUEST:
      return {
        isFetching: true,
        dishes: [...state.dishes]
      };
      break;
    case GET_DISHES_SUCCSESS:
      return {
        isFetching: false,
        dishes: action.dishes
      };
      break;
    case GET_DISHES_ERROR:
      return {
        isFetching: false,
        dishes: []
      };
      break;
    default:
      return state;
  }
};