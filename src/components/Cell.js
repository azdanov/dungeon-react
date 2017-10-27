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

function chooseSymbol(symbol: string) {
  switch (symbol) {
    case 'P':
      return '🙂';
    case 'E':
      return Math.random() < 0.5 ? '😈' : '👿';
    case '1':
      return '▓';
    case 'H':
      return '📦';
    case 'S':
      return '📦';
    case 'W':
      return '📦';
    case 'N':
      return '📶';
    default:
      return '╬';
  }
}

const Cell = (props: Props) => (
  <div
    className={`cell ${props.type} ${props.visible
      ? 'visible'
      : `${props.visited ? 'visited' : 'invisible'}`}`}
  >
    {chooseSymbol(props.symbol)}
  </div>
);

export default Cell;
