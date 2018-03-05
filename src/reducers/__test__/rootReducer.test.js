import cars from '../cars'
import * as types from '../../actions/ActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('root reducer', () => {
    it('should test that the combined reducer is correctly returning the state that matches the child reducer with an empty action ', () => {
        const store = mockStore({ cars: {} });
        expect(store.getState().cars).toEqual(cars(undefined, {}))
    });

    it ('should combine reducers such that the child reducer can handle an action', () => {
        let action = { type: types.FETCH_CAR }
        const store = mockStore({ cars: { isLoading: true } });
        store.dispatch(action)
        expect(store.getState().cars).toEqual(cars(undefined, action))
    })
});