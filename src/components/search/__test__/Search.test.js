import React from 'react';
import { Search } from '../Search';
import renderer from 'react-test-renderer';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Search /> component', () => {
    const defaultProps = {}

    it('should render without breaking', () => {
        const searchComponent = mount(<Search {...defaultProps} />);
        expect(searchComponent.exists()).toBe(true);
        searchComponent.unmount();
    });

    it('should match the snapshot', () => {
        const tree = renderer
            .create(<Search {...defaultProps} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});