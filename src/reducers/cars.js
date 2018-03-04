import { FETCH_CARS, RECEIVE_CARS, FETCH_CAR, RECEIVE_CAR } from '../actions/actionTypes';

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
        case FETCH_CAR: {
            return Object.assign({}, state, {
                isLoading: true
            })
        }
        case RECEIVE_CAR: {
            return Object.assign({}, state, {
                car: payload,
                isLoading: false
            });
        }
        default: {
            return state;
        }
    }
}