// @flow

import React from 'react';
import './Cell.css';

type Props = { type: string, symbol: string, visible: boolean };

const Cell = (props: Props) => (
  <div
    className={`cell ${props.type} ${props.visible ? 'visible' : 'invisible'}`}
  >
    {props.symbol}
  </div>
);

export default Cell;
