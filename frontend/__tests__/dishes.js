import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as types from '../action-types/dishes';
import * as actions from '../action-creators/dishes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('dishes async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates FETCH_DISHES_SUCCESS when fetching dishes has been done', () => {
    const url = window.location.origin + '/rest/dish';
    const dishes = [{"name":"Miso soup","description":"Japanish dish","id":"5642554087309312","image":"https://storage.googleapis.com/mychef-123.appspot.com/IMG_1781.JPG","price":"55"}];
    fetchMock
      .getOnce(url, {
        body: dishes, 
        headers: { 
          'content-type': 'application/json' 
        }
      });
    const expectedActions = [
      { type: types.FETCH_DISHES_REQUEST },
      { type: types.FETCH_DISHES_SUCCESS, dishes }
    ]
    const store = mockStore();

    return store.dispatch(actions.fetchDishes()).then(() => {
      // return of async actions
      console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    })
  })
});