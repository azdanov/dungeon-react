// @flow

import React from 'react';
import { PLAYER_SYMBOL } from '../dungeon/map/entitySymbols';
import './Cell.css';

export function getClassName(cell?: string | number) {
  const className = 'cell';
  switch (cell) {
    case 0: {
      return `${className} bridge`;
    }
    case 1: {
      return `${className} wall`;
    }
    case PLAYER_SYMBOL: {
      return `${className} player`;
    }
    case 'E': {
      return `${className} enemy`;
    }
    case 'H': {
      return `${className} health`;
    }
    case 'S': {
      return `${className} strength`;
    }
    default: {
      return `${className} room`;
    }
  }
}

export function pickSymbol(cell: number | string) {
  switch (cell) {
    case PLAYER_SYMBOL:
      return '☺';
    default:
      return cell;
  }
}

const Cell = (props: {
  cell: number | string,
  rowIndex: number,
  cellIndex: number,
}) => {
  const className = getClassName(props.cell);
  return (
    <div className={className} key={`${props.rowIndex}${props.cellIndex}`}>
      {pickSymbol(props.cell)}
    </div>
  );
};

export default Cell;
