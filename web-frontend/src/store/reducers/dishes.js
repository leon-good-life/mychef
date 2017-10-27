// action
const BEGIN_FETCH_DISHES = 'BEGIN_FETCH_DISHES';
const FETCH_DISHES_SUCCESS = 'FETCH_DISHES_SUCCESS';
const FETCH_DISHES_ERROR = 'FETCH_DISHES_ERROR';

const FETCH_DISHES = 'FETCH_DISHES';


// action creators
const beginFetchDishes = () => ({ action: BEGIN_FETCH_DISHES });
const fetchDishesSuccess = (dishes) => ({ action: FETCH_CONTACT_SUCCESS, dishes });
const fetchDishesError = (error) => ({ action: FETCH_DISHES_ERROR, error });


// ajax
const getDishes = (token) => {
  const url = window.location.origin + '/rest/dish';
  let headers = {};
  headers['X-Auth-Token'] = token;
  return fetch(url, {headers})
    .then(response => {
      if(response.status >= 200 && response.status < 300){
        return Promise.resolve(response.json());
      }
      return Promise.reject(new Error(response.statusText));
    });
};


// thunk action creator
const fetchDishes = (token) => ((dispatch) => {
  return getDishes(token).then(
    dishes => dispatch(fetchDishesSuccess(dishes)),
    error => dispatch(fetchDishesError(error))
  );
});


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