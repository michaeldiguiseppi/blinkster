import React from 'react';
import LandingPage from '../LandingPage';
import renderer from 'react-test-renderer';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('<LandingPage /> component', () => {
    const defaultProps = {
        cars: {
            isLoading: false,
            cars: [{
                "year" : 2013,
                "make" : "Kia",
                "model" : "Optima",
                "mileage" : 24235,
                "drivetrain" : "FWD",
                "bodytype" : "sedan",
                "image_url" : "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
                "created_at" : "2016-10-14T20:13:22.586Z"
              }]
        },
        carsActions: {
            fetchCars: () => {}
        }
    }

    it('should render without breaking', () => {
        const landingPageComponent = mount(<LandingPage {...defaultProps} />);
        expect(landingPageComponent.exists()).toBe(true);
        landingPageComponent.unmount();
    });

    it('should match the snapshot', () => {
        const tree = renderer
            .create(<LandingPage {...defaultProps} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});