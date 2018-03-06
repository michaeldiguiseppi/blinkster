import * as types from './actionTypes';

function baseUrl () {
    return 'https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd';
}

// Get all cars
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

// Handle receive all cars
export function receiveCars(json) {
    return {
        type: types.RECEIVE_CARS,
        payload: json,
    }
}

// Get one car
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

// Handle receive one car
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

// Handle sorting by each method
export function startSortCars(method) {
    return dispatch => {
        dispatch({
            type: types.START_SORT
        });
        return fetch(baseUrl() + '/cars.json')
        .then(response => response.json())
        .then(json => dispatch(receiveSortedCars(json, method)));
    }

}

function receiveSortedCars(json, method) {
    switch (method) {
        case 'year': {
            json = json.sort((a, b) => {
                return a.year > b.year ? 1 : -1;
            });
            return {
                type: types.FINISH_SORT,
                payload: json 
            }
        }
        case 'make': {
            json = json.sort((a, b) => {
                return a.make > b.make ? 1 : -1;
            });
            return {
                type: types.FINISH_SORT,
                payload: json 
            }
        }
        case 'model': {
            json = json.sort((a, b) => {
                return a.model > b.model ? 1 : -1;
            });
            return {
                type: types.FINISH_SORT,
                payload: json 
            }
        }
        case 'mileage': {
            json = json.sort((a, b) => {
                return b.mileage - a.mileage;
            });
            return {
                type: types.FINISH_SORT,
                payload: json 
            }
        }
        case 'created_at': {
            json = json.sort((a, b) => {
                return a.created_at < b.created_at ? 1 : -1;
            });
            return {
                type: types.FINISH_SORT,
                payload: json 
            }
        }
        default: {
            return {
                type: types.FINISH_SORT,
                payload: json 
            }
        }
    }
}
