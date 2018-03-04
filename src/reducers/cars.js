import { FETCH_CARS, RECEIVE_CARS } from '../actions/actionTypes';

export default function cars(state = {}, action) {
    const { type, payload } = action;
    switch(type) {
        case FETCH_CARS: {
            return Object.assign({}, state, {
                isLoading: true 
            });
        }
        case RECEIVE_CARS: {
            return Object.assign({}, state, {
                cars: payload,
                isLoading: false,
            });
        }
        default: {
            return state;
        }
    }
}