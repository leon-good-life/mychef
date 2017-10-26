// action
const BEGIN_FETCH_DISHES = 'BEGIN_FETCH_DISHES';
const FETCH_DISHES_SUCCESS = 'FETCH_DISHES_SUCCESS';
const FETCH_DISHES_ERROR = 'FETCH_DISHES_ERROR';

// reducer
const dishes = (state = {dishes: [], isFetching: false}, action) => {
  switch(action.type){
    case BEGIN_FETCH_DISHES:
      return {
        isFetching: true,
        dishes: [...state.dishes]
      };
      break;
    case FETCH_DISHES_SUCCESS:
      return {
        isFetching: false,
        dishes: action.dishes
      };
      break;
    case FETCH_DISHES_ERROR:
      return {
        isFetching: false,
        dishes: []
      };
      break;
    default:
      return state;
  }
};