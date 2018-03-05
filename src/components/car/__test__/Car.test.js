import React from 'react';
import { Car } from '../Car';
import renderer from 'react-test-renderer';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Car /> component', () => {
    let carComponent;
    const defaultProps = {
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
        index: 0
    }

    beforeEach(() => {
        carComponent = mount(<table><tbody><Car {...defaultProps} /></tbody></table>);
    });

    afterEach(() => {
        carComponent.unmount();
    });

    it('should render without breaking', () => {
        expect(carComponent.exists()).toBe(true);
    });

    it('should match the snapshot', () => {
        const tree = renderer
            .create(<table><tbody><Car {...defaultProps} /></tbody></table>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render the drivetrain if it exists', () => {
        expect(carComponent.find('.veh-drivetrain').exists()).toBe(true);
        expect(carComponent.find('.veh-drivetrain').text()).toEqual("FWD");
    });

    it('should render "N/A" if no drivetrain exists', () => {
        let props = {
            car: {
                "year" : 2013,
                "make" : "Kia",
                "model" : "Optima",
                "mileage" : 24235,
                "bodytype" : "sedan",
                "image_url" : "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
                "created_at" : "2016-10-14T20:13:22.586Z"
        },
        index: 0
        }
        carComponent.unmount();
        carComponent = mount(<table><tbody><Car {...props} /></tbody></table>);
        expect(carComponent.find('.veh-drivetrain').text()).toEqual("N/A");
    });
});