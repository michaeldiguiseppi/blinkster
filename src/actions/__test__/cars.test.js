let fetchMock = require('fetch-mock/es5/server')
import { fetchCars, fetchCar, startSortCars } from '../cars';
import * as types from '../actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';
import * as data from './cars.data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const baseUrl = "https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd/cars.json"


describe('Cars actions', () => {
    const mockDataResponse = {
        cars: {
            cars: data.allVehicles } }
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('should call the FETCH_CARS action', () => {
        fetchMock.getOnce(baseUrl, mockDataResponse);

        const expectedActions = [
            { type: types.FETCH_CARS },
            { type: types.RECEIVE_CARS, payload: mockDataResponse }
        ]

        const store = mockStore({ cars: { cars: [] } });

        return store.dispatch(fetchCars()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should call the FETCH_CAR action', () => {
        const mockResponse = data.oneVehicle;
        fetchMock.getOnce(baseUrl, mockResponse);

        const expectedActions = [
            { type: types.FETCH_CAR },
            { type: types.RECEIVE_CAR, payload: mockResponse[0] }
        ]

        const store = mockStore({ cars: { car: {} } });
        const year = '2013';
        const make = 'Kia';
        const model = 'Optima';

        return store.dispatch(fetchCar(year, make, model)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle a failure to the FETCH_CAR action', () => {
        const mockResponse = data.oneVehicle;
        fetchMock.getOnce(baseUrl, mockResponse);

        const expectedActions = [
            { type: types.FETCH_CAR },
            { type: types.FAILED_TO_FIND_CAR }
        ]

        const store = mockStore({ cars: { car: {} } });
        const year = '2010';
        const make = 'Chevrolet';
        const model = 'Corvette';

        return store.dispatch(fetchCar(year, make, model)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('Car filter actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    const mockResponse = data.allVehicles;


    it('should return a sorted array by year oldest to newest', () => {
        fetchMock.getOnce(baseUrl, mockResponse);

        const expectedActions = [
            { type: types.START_SORT },
            { type: types.FINISH_SORT, payload: data.allVehiclesByYear }
        ]

        const store = mockStore({ cars: { car: {} } });

        return store.dispatch(startSortCars('year')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return a sorted array by make alphabetically', () => {
        fetchMock.getOnce(baseUrl, mockResponse);

        const expectedActions = [
            { type: types.START_SORT },
            { type: types.FINISH_SORT, payload: data.allVehiclesByMake }
        ]

        const store = mockStore({ cars: { car: {} } });

        return store.dispatch(startSortCars('make')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return a sorted array by model alphabetically', () => {
        fetchMock.getOnce(baseUrl, mockResponse);

        const expectedActions = [
            { type: types.START_SORT },
            { type: types.FINISH_SORT, payload: data.allVehiclesByModel }
        ]

        const store = mockStore({ cars: { car: {} } });

        return store.dispatch(startSortCars('model')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return a sorted array by mileage highest to lowest', () => {
        fetchMock.getOnce(baseUrl, mockResponse);

        const expectedActions = [
            { type: types.START_SORT },
            { type: types.FINISH_SORT, payload: data.allVehiclesByMileage }
        ]

        const store = mockStore({ cars: { car: {} } });

        return store.dispatch(startSortCars('mileage')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return a sorted array by created_at newest to oldest', () => {
        fetchMock.getOnce(baseUrl, mockResponse);

        const expectedActions = [
            { type: types.START_SORT },
            { type: types.FINISH_SORT, payload: data.allVehiclesByCreatedAt }
        ]

        const store = mockStore({ cars: { car: {} } });

        return store.dispatch(startSortCars('created_at')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return the original sorting of the array if invalid parameter is passed', () => {
        fetchMock.getOnce(baseUrl, mockResponse);

        const expectedActions = [
            { type: types.START_SORT },
            { type: types.FINISH_SORT, payload: data.allVehicles }
        ]

        const store = mockStore({ cars: { cars: {} } });

        return store.dispatch(startSortCars('drivetrain')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});