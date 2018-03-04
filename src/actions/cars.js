import * as types from './actionTypes';

function baseUrl () {
    return 'https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd/cars.json';
}

export function receiveCars(json) {
    return {
        type: types.RECEIVE_CARS,
        payload: json,
    }
}

export function fetchCars() {
    return dispatch => {
        dispatch({
            type: types.FETCH_CARS,
        });
        return fetch(baseUrl())
        .then(response => response.json())
        .then(json => dispatch(receiveCars(json)));
    };
}