// @flow
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

import UI from './UI';

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('UI', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <UI
        log={['Message 1', 'Message 2', 'Message 3', 'Message 4']}
        health={100}
        strength={10}
        level={1}
        experience={50}
        levelThreshold={120}
        zone={1}
        weapon={{ id: 1, power: 10 }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
