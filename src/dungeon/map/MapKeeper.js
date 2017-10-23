// @flow

import { NewDungeon } from 'random-dungeon-generator';
import type PlayerType from '../entities/creatures/Player';
import type EnemyType from '../entities/creatures/Enemy';
import { PLAYER_SYMBOL } from './entitySymbols';

class MapKeeper {
  dungeon: Array<Array<number | string>>;
  width: number;
  height: number;
  minRoomSize: number;
  maxRoomSize: number;
  rooms: {
    [number]: {
      x: number,
      y: number,
      width: number,
      height: number,
    },
  };

  constructor(
    width: number = 50,
    height: number = 50,
    minRoomSize: number = 5,
    maxRoomSize: number = 15,
  ) {
    this.width = width;
    this.height = height;
    this.minRoomSize = minRoomSize;
    this.maxRoomSize = maxRoomSize;

    this.dungeon = NewDungeon({
      width: this.width,
      height: this.height,
      minRoomSize: this.minRoomSize,
      maxRoomSize: this.maxRoomSize,
    });

    this.rooms = this.findRooms();
  }

  findRooms() {
    const rooms: {
      [number]: { x: number, y: number, width: number, height: number },
    } = {};
    this.dungeon.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (typeof cell !== 'number') return; // Refinement for flow

        if (cell >= 2) {
          // Room numbers start from 2
          if (!rooms[cell]) {
            // Upper-Left Room Corner
            if (this.dungeon[y][x - 1] === 0) {
              // Bridge found
              rooms[cell] = { x: x - 1, y, width: 0, height: 0 };
            } else {
              // Wall found
              rooms[cell] = { x, y, width: 0, height: 0 };
            }
          } else if (this.dungeon[y + 1][x] !== cell && rooms[cell].width) {
            // Room Height
            const { width } = rooms[cell];

            if (this.dungeon[y + 1][rooms[cell].x + width] === 1) {
              // Wall found
              rooms[cell] = {
                ...rooms[cell],
                height: y - rooms[cell].y + 1,
              };
            } else {
              // Bridge found
              rooms[cell] = {
                ...rooms[cell],
                height: y - rooms[cell].y,
              };
            }
            // Room Width
          } else if (this.dungeon[y][x + 1] !== cell) {
            if (this.dungeon[y][x + 1] === 1) {
              // Wall found
              rooms[cell] = {
                ...rooms[cell],
                width: x - rooms[cell].x + 1,
              };
            } else {
              // Bridge found
              rooms[cell] = {
                ...rooms[cell],
                width: x - rooms[cell].x,
              };
            }
          }
        }
      });
    });
    return rooms;
  }

  updateMap(entities: { player: ?PlayerType, enemies: ?Array<EnemyType> }) {
    if (entities.player) {
      const { x, y } = entities.player.location;
      this.dungeon[y][x] = PLAYER_SYMBOL;
    }
  }
}

export default MapKeeper;
