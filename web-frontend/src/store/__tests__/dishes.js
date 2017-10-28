import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as types from '../action-types/dishes';
import * as actions from '../action-creators/dishes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates GET_DISHES_SUCCESS when fetching dishes has been done', () => {
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
      { type: types.GET_DISHES_REQUEST, loading: true },
      { type: types.GET_DISHES_SUCCESS, dishes, loading: false }
    ]
    const store = mockStore();

    return store.dispatch(actions.getDishes()).then(() => {
      // return of async actions
      console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    })
  })
});