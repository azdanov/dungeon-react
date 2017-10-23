// @flow
/* eslint-disable react/no-array-index-key */
import React from 'react';

import './Map.css';
import Cell from './Cell';

const Map = (props: { dungeon: Array<Array<number | string>> }) => (
  <div>
    {props.dungeon.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <Cell
            key={cellIndex}
            cell={cell}
            rowIndex={rowIndex}
            cellIndex={cellIndex}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Map;
