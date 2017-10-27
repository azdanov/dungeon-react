// @flow
import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

import Game from './Game';

configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('Game', () => {
  it('renders without crashing', () => {
    const wrapper = render(<Game />);

    expect(wrapper).toMatchSnapshot();
  });
});
