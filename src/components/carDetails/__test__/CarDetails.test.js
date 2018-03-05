import React from 'react';
import { CarDetails } from '../CarDetails';
import renderer from 'react-test-renderer';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('<CarDetails /> component', () => {
    let carDetailsComponent;
    const defaultProps = {
        cars: {
            isLoading: false,
            car: {
                "year" : 2013,
                "make" : "Kia",
                "model" : "Optima",
                "mileage" : 24235,
                "drivetrain" : "FWD",
                "bodytype" : "sedan",
                "image_url" : "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
                "created_at" : "2016-10-14T20:13:22.586Z"
              }
        },
        carsActions: {
            fetchCar: () => {}
        },
        match: {
            params: {
                index: 0
            }
        },
    }

    beforeEach(() => {
        carDetailsComponent = mount(<CarDetails {...defaultProps} />);
    });

    afterEach(() => {
        carDetailsComponent.unmount();
    });

    it('should render without breaking', () => {
        expect(carDetailsComponent.exists()).toBe(true);
    });

    it('should match the snapshot', () => {
        const tree = renderer
            .create(<CarDetails {...defaultProps} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should have a list of car information', () => {
        expect(carDetailsComponent.find('ul.no-list-style')).toHaveLength(1);
        // Should have seven key pieces of information rendered
        expect(carDetailsComponent.find('.veh-info')).toHaveLength(7);
    });

    it('should render an image of the car', () => {
        expect(carDetailsComponent.find('img')).toHaveLength(1);
        expect(carDetailsComponent.find('img').prop('src')).toEqual(defaultProps.cars.car.image_url);
    });

    it('should render an error message if no car is found', () => {
        let props = {
            cars: {
                isLoading: false,
                car: {},
            },
            carsActions: {
                fetchCar: () => {}
            },
            match: {
                params: {
                    index: 0
                }
            },
        }
        carDetailsComponent.unmount();
        carDetailsComponent = mount(<CarDetails {...props} />);
        let jumbotron = carDetailsComponent.find('div.jumbotron');
        expect(carDetailsComponent.exists()).toBe(true);
        expect(jumbotron).toHaveLength(1);
        expect(jumbotron.text()).toEqual("Car not found");
    });
});