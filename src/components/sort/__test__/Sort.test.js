import React from 'react';
import { Sort } from '../Sort';
import renderer from 'react-test-renderer';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Sort /> component', () => {
    const defaultProps = {}

    it('should render without breaking', () => {
        const sortComponent = mount(<Sort {...defaultProps} />);
        expect(sortComponent.exists()).toBe(true);
        sortComponent.unmount();
    });

    it('should match the snapshot', () => {
        const tree = renderer
            .create(<Sort {...defaultProps} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});