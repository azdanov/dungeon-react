// @flow

import { NewDungeon } from 'random-dungeon-generator';
// TODO : WRITE TESTS!
class MapKeeper {
  dungeon: Array<Array<number | string>>;
  width: number;
  height: number;
  minRoomSize: number;
  maxRoomSize: number;
  lastRoom: number;

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
    this.lastRoom = this.findMaxRooms() - 2; // 2 is default starting room
    this.findRoomCoords();
  }

  findMaxRooms() {
    let maxNum = 0;
    this.dungeon.forEach(row => {
      row.forEach(cell => {
        if (typeof cell === 'number') {
          if (cell > maxNum) maxNum = cell;
        }
      });
    });
    return maxNum;
  }

  findRoomCoords() {
    const roomCoords: { [number]: { x: number, y: number } } = {};
    // Upper-left corner of rooms
    this.dungeon.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (typeof cell === 'number') {
          if (cell >= 2) {
            // Upper-Left Room Corner
            if (!roomCoords[cell]) {
              // Bridge
              if (this.dungeon[y][x - 1] === 0) {
                roomCoords[cell] = { x: x - 1, y };
                // Normal
              } else {
                roomCoords[cell] = { x, y };
              }
              // Room Height
            } else if (this.dungeon[y + 1][x] !== cell && roomCoords[cell].w) {
              // Wall
              let width = x;
              if (typeof roomCoords[cell].w === 'number') {
                width = roomCoords[cell].w;
              }
              if (this.dungeon[y + 1][roomCoords[cell].x + width] === 1) {
                roomCoords[cell] = {
                  ...roomCoords[cell],
                  h: y - roomCoords[cell].y + 1,
                };
                // Bridge
              } else {
                roomCoords[cell] = {
                  ...roomCoords[cell],
                  h: y - roomCoords[cell].y,
                };
              }
              // Room Width
            } else if (this.dungeon[y][x + 1] !== cell) {
              // Wall
              if (this.dungeon[y][x + 1] === 1) {
                roomCoords[cell] = {
                  ...roomCoords[cell],
                  w: x - roomCoords[cell].x + 1,
                };
                // Bridge
              } else {
                roomCoords[cell] = {
                  ...roomCoords[cell],
                  w: x - roomCoords[cell].x,
                };
              }
            }
          }
        }
      });
    });
    console.log(roomCoords);
  }
}

export default MapKeeper;
