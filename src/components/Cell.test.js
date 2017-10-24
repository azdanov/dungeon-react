// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Cell from './Cell';

describe('Cell', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Cell type="wall" symbol="0" />, div);
  });
});
