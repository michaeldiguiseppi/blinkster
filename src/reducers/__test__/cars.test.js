import cars from '../cars'
import * as types from '../../actions/ActionTypes';
import * as data from '../../actions/__test__/cars.data';

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
    
    expect(cars({ isLoading: true }, { type: types.RECEIVE_CARS, payload: data.allVehicles
    })).toEqual({
        cars: data.allVehicles,
        isLoading: false
    });
  });

  it('should handle FETCH_CAR', () => {
    expect(cars({}, {
        type: types.FETCH_CAR,
      })).toEqual({
        isLoading: true
      });
    
    expect(cars({ isLoading: true }, { 
      type: types.RECEIVE_CAR, payload: data.oneVehicle
    })).toEqual({
        car: data.oneVehicle,
        isLoading: false
    });
  });

  it('should return correct data with no sort', () => {
    expect(cars({}, { 
      type: types.START_SORT 
    })).toEqual({});

    expect(cars({}, { 
      type: types.FINISH_SORT, payload: data.allVehicles 
    })).toEqual({
      cars: data.allVehicles
    })
  });

  it('should return correct data with sort applied', () => {
    expect(cars({}, { 
      type: types.START_SORT 
    })).toEqual({});

    expect(cars({}, { 
      type: types.FINISH_SORT, payload: data.allVehiclesByYear 
    })).toEqual({
      cars: data.allVehiclesByYear
    })
  });

});