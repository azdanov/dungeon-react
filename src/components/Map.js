// @flow
/* eslint-disable react/no-array-index-key */
import React from 'react';
import type { cell } from '../dungeon/DungeonKeeper';

import Cell from './Cell';
import './Map.css';

const Map = (props: { dungeonMap: Array<Array<cell>> }) => (
  <div>
    {props.dungeonMap.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((cellObj, cellIndex) => (
          <Cell
            key={cellIndex}
            type={cellObj.type}
            symbol={cellObj.symbol}
            visible={cellObj.visible}
            visited={cellObj.visited}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Map;
