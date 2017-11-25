import * as ActionTypes from './types/chef'
import * as Ajax from '../ajax/chef'

/*
  Create dish
*/

export const createDishRequest = () => ({
  type: ActionTypes.CREATE_DISH_REQUEST
})

export const createDishSuccess = () => ({
  type: ActionTypes.CREATE_DISH_SUCCESS
})

export const createDishError = error => ({
  type: ActionTypes.CREATE_DISH_ERROR,
  error
})

export const createDish = (
  name,
  description,
  image,
  price,
  token
) => dispatch => {
  dispatch(createDishRequest())
  return Ajax.createDish(name, description, image, price, token).then(
    () => dispatch(createDishSuccess()),
    error => dispatch(createDishError(error))
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

/*
  Delete dish
*/

export const deleteDishRequest = () => ({
  type: ActionTypes.DELETE_DISH_REQUEST
})

export const deleteDishSuccess = () => ({
  type: ActionTypes.DELETE_DISH_SUCCESS
})

export const deleteDishError = error => ({
  type: ActionTypes.DELETE_DISH_ERROR,
  error
})

export const deleteDish = (id, token) => dispatch => {
  dispatch(deleteDishRequest())
  return Ajax.deleteDish(id, token).then(
    () => dispatch(deleteDishSuccess()),
    error => dispatch(deleteDishError(error))
  )
}

/*
  Update dish
*/

export const updateDishRequest = () => ({
  type: ActionTypes.UPDATE_DISH_REQUEST
})

export const updateDishSuccess = () => ({
  type: ActionTypes.UPDATE_DISH_SUCCESS
})

export const updateDishError = error => ({
  type: ActionTypes.UPDATE_DISH_ERROR,
  error
})

export const updateDish = (
  id,
  name,
  description,
  image,
  price,
  token
) => dispatch => {
  dispatch(updateDishRequest())
  return Ajax.updateDish(id, name, description, image, price, token).then(
    () => dispatch(updateDishSuccess()),
    error => dispatch(updateDishError(error))
  )
}

/*
  Upload dish image
*/

export const uploadDishImageRequest = () => ({
  type: ActionTypes.UPLOAD_DISH_IMAGE_REQUEST
})

export const uploadDishImageSuccess = () => ({
  type: ActionTypes.UPLOAD_DISH_IMAGE_SUCCESS
})

export const uploadDishImageError = error => ({
  type: ActionTypes.UPLOAD_DISH_IMAGE_ERROR,
  error
})

export const uploadDishImage = (
  data,
  token,
  progress,
  created,
  error
) => dispatch => {
  dispatch(uploadDishImageRequest())
  Ajax.uploadDishImage(
    data,
    token,
    progress,
    () => dispatch(uploadDishImageSuccess()),
    error => dispatch(uploadDishImageError(error))
  )
}

/*
  Update dish availability
*/

export const updateDishAvailabilityRequest = () => ({
  type: ActionTypes.UPDATE_DISH_AVAILABILITY_REQUEST
})

export const updateDishAvailabilitySuccess = () => ({
  type: ActionTypes.UPDATE_DISH_AVAILABILITY_SUCCESS
})

export const updateDishAvailabilityError = error => ({
  type: ActionTypes.UPDATE_DISH_AVAILABILITY_ERROR,
  error
})

export const updateDishAvailability = (
  id,
  quantity,
  time,
  token
) => dispatch => {
  dispatch(updateDishAvailabilityRequest())
  return Ajax.updateDishAvailability(id, quantity, time, token).then(
    () => dispatch(updateDishAvailabilitySuccess()),
    error => dispatch(updateDishAvailabilityError(error))
  )
}


/*
  Create user
*/

export const createUserRequest = () => ({
  type: ActionTypes.CREATE_USER_REQUEST
})

export const createUserSuccess = user => ({
  type: ActionTypes.CREATE_USER_SUCCESS,
  user
})

export const createUserError = error => ({
  type: ActionTypes.CREATE_USER_ERROR,
  error
})

export const createUser = token => dispatch => {
  dispatch(createUserRequest())
  return Ajax.createUser(token).then(
    user => dispatch(createUserSuccess(user)),
    error => dispatch(createUserError(error))
  )
}

/*
  Fetch user
*/

export const fetchUserRequest = () => ({
  type: ActionTypes.FETCH_USER_REQUEST
})

export const fetchUserSuccess = user => ({
  type: ActionTypes.FETCH_USER_SUCCESS,
  user
})

export const fetchUserError = error => ({
  type: ActionTypes.FETCH_USER_ERROR,
  error
})

export const fetchUser = token => dispatch => {
  dispatch(fetchUserRequest())
  return Ajax.fetchUser(token).then(
    user => dispatch(fetchUserSuccess(user)),
    error => dispatch(fetchUserError(error))
  )
}

/*
  Update user
*/

export const updateUserRequest = () => ({
  type: ActionTypes.UPDATE_USER_REQUEST
})

export const updateUserSuccess = user => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
  user
})

export const updateUserError = error => ({
  type: ActionTypes.UPDATE_USER_ERROR,
  error
})

export const updateUser = (
  name,
  email,
  telephone,
  address,
  token
) => dispatch => {
  dispatch(updateUserRequest())
  return Ajax.updateUser(name, email, telephone, address, token).then(
    user => dispatch(updateUserSuccess(user)),
    error => dispatch(updateUserError(error))
  )
}
