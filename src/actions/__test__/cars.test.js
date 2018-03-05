let fetchMock = require('fetch-mock/es5/server')
import { fetchCars, fetchCar } from '../cars';
import * as types from '../actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const baseUrl = "https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd/cars.json"


describe('Cars actions', () => {
    const mockDataResponse = {
        cars: {
            cars: [
        {
            "year" : 2013,
            "make" : "Kia",
            "model" : "Optima",
            "mileage" : 24235,
            "drivetrain" : "FWD",
            "bodytype" : "sedan",
            "image_url" : "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
            "created_at" : "2016-10-14T20:13:22.586Z"
        },
        {
            "year" : 2013,
            "make" : "Hyundai",
            "model" : "Accent",
            "mileage" : 21587,
            "drivetrain" : "FWD",
            "bodytype" : "sedan",
            "image_url" : "http://www.conceptcarz.com/images/Hyundai/2013-Hyundai-Accent-Sedan-Image-01.jpg",
            "created_at" : "2016-11-14T20:13:22.586Z"
        },
    ] } }
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
        const mockResponse = [{
            "year" : 2013,
            "make" : "Kia",
            "model" : "Optima",
            "mileage" : 24235,
            "drivetrain" : "FWD",
            "bodytype" : "sedan",
            "image_url" : "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
            "created_at" : "2016-10-14T20:13:22.586Z"
            }]
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
        const mockResponse = [{
            "year" : 2013,
            "make" : "Kia",
            "model" : "Optima",
            "mileage" : 24235,
            "drivetrain" : "FWD",
            "bodytype" : "sedan",
            "image_url" : "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
            "created_at" : "2016-10-14T20:13:22.586Z"
            }]
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