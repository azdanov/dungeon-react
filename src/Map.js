// @flow
/* eslint-disable react/no-array-index-key */
import React from 'react';

import './Map.css';
import dungeon from './utils/DungeonMaster';

export function getClassName(cell?: string | number) {
  const className = 'cell';
  switch (cell) {
    case 0: {
      return `${className} bridge`;
    }
    case 1: {
      return `${className} wall`;
    }
    case 'P': {
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

const Map = () => (
  <div className="app">
    {dungeon.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((cell, cellIndex) => {
          const className = getClassName(cell);
          return (
            <div className={className} key={`${rowIndex}${cellIndex}`}>
              {cell}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

export default Map;
