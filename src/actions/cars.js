import * as types from './actionTypes';

function baseUrl () {
    return 'https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd';
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
        return fetch(baseUrl() + '/cars.json')
        .then(response => response.json())
        .then(json => dispatch(receiveCars(json)));
    };
}

export function fetchCar(year, make, model) {
    return dispatch => {
        dispatch({
            type: types.FETCH_CAR,
        });
        return fetch(baseUrl() + '/cars.json')
        .then(response => response.json())
        .then(json => dispatch(receiveCar(json, year, make, model)));
    }
}

export function receiveCar(json, year, make, model) {
    let foundCar = json.filter((car) => {
        return car.year === parseInt(year, 10) && car.make === make && car.model === model;
    })[0];
    if (foundCar) {
        return {
            type: types.RECEIVE_CAR,
            payload: foundCar
        }
    } else {
        return {
            type: types.FAILED_TO_FIND_CAR
        }
    }
}