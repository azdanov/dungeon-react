import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

import Map from './Map';

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('Map', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Map dungeonMap={[]} />);

    expect(wrapper).toMatchSnapshot();
  });
});
