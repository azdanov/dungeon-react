// @flow

import React from 'react';
import './Cell.css';

type Props = {
  type: string,
  symbol: string,
  visible: boolean,
  // eslint-disable-next-line react/require-default-props
  visited?: boolean,
};

const Cell = (props: Props) => (
  <div
    className={`cell ${props.type} ${props.visible
      ? 'visible'
      : `${props.visited ? 'visited' : 'invisible'}`}`}
  >
    {props.symbol}
  </div>
);

export default Cell;
