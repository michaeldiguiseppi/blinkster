import React from 'react';
import LandingPage from '../LandingPage';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('<LandingPage /> component', () => {

    const defaultProps = {
        cars: {
            isLoading: false,
            cars: []
        },
        carsActions: {
            fetchCars: () => {}
        }
    }

    it('should render without breaking', () => {
        const component = shallow(<LandingPage {...defaultProps} />);
        expect(component.find("table").exists()).toEqual(true);
    });

    it('should match the snapshot', () => {
        const tree = renderer
            .create(<LandingPage {...defaultProps} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});