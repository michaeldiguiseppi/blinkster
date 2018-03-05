import cars from '../cars'
import * as types from '../../actions/ActionTypes';

describe('cars reducer', () => {
  it('should return the initial state', () => {
    expect(cars(undefined, {})).toEqual({})
  });

  it('should handle FETCH_CARS', () => {
    expect(cars({}, {
        type: types.FETCH_CARS,
      })).toEqual({
        isLoading: true
      });
    
    expect(cars({ isLoading: true }, { type: types.RECEIVE_CARS, payload: [{
            "year" : 2013,
            "make" : "Kia",
            "model" : "Optima",
            "mileage" : 24235,
            "drivetrain" : "FWD",
            "bodytype" : "sedan",
            "image_url" : "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
            "created_at" : "2016-10-14T20:13:22.586Z"
        }]
    })).toEqual({
        cars: [{
            "year" : 2013,
            "make" : "Kia",
            "model" : "Optima",
            "mileage" : 24235,
            "drivetrain" : "FWD",
            "bodytype" : "sedan",
            "image_url" : "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
            "created_at" : "2016-10-14T20:13:22.586Z"
        }],
        isLoading: false
    });
  });

  it('should handle FETCH_CAR', () => {
    expect(cars({}, {
        type: types.FETCH_CAR,
      })).toEqual({
        isLoading: true
      });
    
    expect(cars({ isLoading: true }, { type: types.RECEIVE_CAR, payload: {
            "year" : 2013,
            "make" : "Kia",
            "model" : "Optima",
            "mileage" : 24235,
            "drivetrain" : "FWD",
            "bodytype" : "sedan",
            "image_url" : "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
            "created_at" : "2016-10-14T20:13:22.586Z"
        }
    })).toEqual({
        car: {
            "year" : 2013,
            "make" : "Kia",
            "model" : "Optima",
            "mileage" : 24235,
            "drivetrain" : "FWD",
            "bodytype" : "sedan",
            "image_url" : "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
            "created_at" : "2016-10-14T20:13:22.586Z"
        },
        isLoading: false
    });
  });
});