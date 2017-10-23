// @flow
/* eslint-disable react/no-array-index-key */
import React from 'react';

import './Map.css';
import Cell from './Cell';
import type DungeonMaster from '../dungeon/DungeonMaster';

const Map = (props: { dungeonMaster: DungeonMaster }) => (
  <div>
    {props.dungeonMaster.mapKeeper.dungeon.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <Cell
            key={`${cellIndex}${rowIndex}`}
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
