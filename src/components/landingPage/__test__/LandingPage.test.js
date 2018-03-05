import React from 'react';
import { LandingPage } from '../LandingPage';
import renderer from 'react-test-renderer';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<LandingPage /> component', () => {
    let landingPageComponent;
    const defaultProps = {
        cars: {
            isLoading: false,
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
            ]
        },
        carsActions: {
            fetchCars: () => {}
        }
    }

    beforeEach(() => {
        landingPageComponent = mount(<LandingPage {...defaultProps} />);
    });

    afterEach(() => {
        landingPageComponent.unmount();
    });

    it('should render without breaking', () => {
        expect(landingPageComponent.exists()).toBe(true);
    });

    it('should match the snapshot', () => {
        const tree = renderer
            .create(<LandingPage {...defaultProps} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render with 2 vehicles', () => {
        expect(landingPageComponent.find('Car')).toHaveLength(2);
        expect(landingPageComponent.find('Car').first().prop('car')).toHaveProperty('year');
    });

    it('should have a search bar', () => {
        expect(landingPageComponent.find('input')).toHaveLength(1);
    });
});