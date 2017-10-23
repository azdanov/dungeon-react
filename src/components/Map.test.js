import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';

describe('Map', () => {
  xit('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Map />, div);
  });
});
