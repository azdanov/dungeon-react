// @flow

import React from 'react';
import './Cell.css';

const Cell = (props: { type: string, symbol: string }) => (
  <div className={`cell ${props.type}`}>{props.symbol}</div>
);

export default Cell;
