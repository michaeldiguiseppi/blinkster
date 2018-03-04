import React from 'react';
import Header from '../Header';
import renderer from 'react-test-renderer';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('<Header /> component', () => {
    const defaultProps = {
        
    }

    it('should render without breaking', () => {
        const headerComponent = mount(<Header {...defaultProps} />);
        expect(headerComponent.exists()).toBe(true);
        headerComponent.unmount();
    });

    it('should match the snapshot', () => {
        const tree = renderer
            .create(<Header {...defaultProps} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});