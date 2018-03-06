import * as types from '../actions/actionTypes';

export default function cars(state = {}, action) {
    const { type, payload, sort } = action;
    switch(type) {
        case types.FETCH_CARS: {
            return Object.assign({}, state, {
                isLoading: true 
            });
        }
        case types.RECEIVE_CARS: {
            return Object.assign({}, state, {
                cars: payload,
                isLoading: false,
            });
        }
        case types.FETCH_CAR: {
            return Object.assign({}, state, {
                isLoading: true
            });
        }
        case types.RECEIVE_CAR: {
            return Object.assign({}, state, {
                car: payload,
                isLoading: false
            });
        } 
        case types.FAILED_TO_FIND_CAR: {
            return Object.assign({}, state, {
                isLoading: false
            });
        }
        case types.START_SORT: {
            return state;
        }
        case types.FINISH_SORT: {
            return Object.assign({}, state, {
                cars: payload
            });
        }
        default: {
            return state;
        }
    }
}