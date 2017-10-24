// @flow

import { NewDungeon } from 'random-dungeon-generator';
import { random, head, keys } from 'lodash';

import type creatureType from './Creature';

export type rooms = {
  [number]: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
};

export type cell = {
  type: string,
  symbol: string,
  visibility?: number,
  lightning?: number,
  occupiedBy?: creatureType | null,
  bonus?: {},
};

export type dungeon = {
  rooms: rooms,
  map: Array<Array<cell>>,
  player?: creatureType,
  enemies?: Array<creatureType>,
};

export const cellTypes = {
  '0': 'bridge',
  '1': 'wall',
  p: 'player',
  e: 'enemy',
};

export function chooseCellType(cellType: string) {
  return cellTypes[cellType] ? cellTypes[cellType] : 'room';
}

export default class Dungeon {
  dungeonPlan: Array<Array<number>>;
  dungeon: dungeon;

  constructor() {
    this.dungeonPlan = NewDungeon({
      width: 50,
      height: 50,
      minRoomSize: 5,
      maxRoomSize: 15,
    });

    this.dungeon = {
      rooms: {},
      map: [],
    };

    this.findRooms();
    this.createMap();
  }

  addPlayer(player: creatureType) {
    this.dungeon.player = player;
    this.pickPlayerLocation(player);
  }

  addEnemies(enemies: Array<creatureType>) {
    this.dungeon.enemies = enemies;
  }

  pickPlayerLocation(player: creatureType) {
    const dRooms = this.dungeon.rooms;
    const firstRoom = Number.parseInt(head(keys(dRooms)), 10);
    const x = random(
      dRooms[firstRoom].x,
      dRooms[firstRoom].x + dRooms[firstRoom].width - 1,
    );
    const y = random(
      dRooms[firstRoom].y,
      dRooms[firstRoom].y + dRooms[firstRoom].height - 1,
    );
    this.setOccupation(player, x, y);
  }

  setOccupation(creature: ?creatureType, x: number, y: number) {
    if (creature) {
      const symbol = creature.type === 'player' ? 'P' : 'E';
      const { type } = creature;
      this.dungeon.map[y][x] = {
        ...this.dungeon.map[y][x],
        type,
        symbol,
        occupiedBy: creature,
      };
      creature.setLocation(x, y);
    } else {
      const cT = String(this.dungeonPlan[y][x]);
      this.dungeon.map[y][x] = {
        ...this.dungeon.map[y][x],
        type: chooseCellType(cT),
        symbol: cT,
        occupiedBy: null,
      };
    }
  }

  createMap() {
    this.dungeonPlan.forEach((row, iY) => {
      row.forEach((cellType, iX) => {
        const cT = String(cellType);
        if (!this.dungeon.map[iY]) this.dungeon.map[iY] = [];
        this.dungeon.map[iY][iX] = {
          type: chooseCellType(cT),
          symbol: cT,
        };
      });
    });
  }

  movePlayer(direction: string) {
    let offsetX = 0;
    let offsetY = 0;
    let newX;
    let newY;

    if (!this.dungeon.player) return;
    const { x, y } = this.dungeon.player.location;
    switch (direction) {
      case 'up':
        offsetY = -1;
        newX = x + offsetX;
        newY = y + offsetY;
        if (!this.isOccupied(newX, newY) && this.dungeon.player) {
          this.setOccupation(this.dungeon.player, newX, newY);
          this.setOccupation(null, x, y);
        }
        break;
      case 'down':
        offsetY = 1;
        newX = x + offsetX;
        newY = y + offsetY;
        if (!this.isOccupied(newX, newY) && this.dungeon.player) {
          this.setOccupation(this.dungeon.player, newX, newY);
          this.setOccupation(null, x, y);
        }
        break;
      case 'left':
        offsetX = -1;
        newX = x + offsetX;
        newY = y + offsetY;
        if (!this.isOccupied(newX, newY) && this.dungeon.player) {
          this.setOccupation(this.dungeon.player, newX, newY);
          this.setOccupation(null, x, y);
        }
        break;
      case 'right':
        offsetX = 1;
        newX = x + offsetX;
        newY = y + offsetY;
        if (!this.isOccupied(newX, newY) && this.dungeon.player) {
          this.setOccupation(this.dungeon.player, newX, newY);
          this.setOccupation(null, x, y);
        }
        break;
      default:
        break;
    }
  }

  isOccupied(x: number, y: number) {
    return Boolean(
      this.dungeon.map[y][x].occupiedBy ||
        this.dungeon.map[y][x].type === 'wall',
    );
  }

  findRooms() {
    this.dungeonPlan.forEach((row, y) => {
      row.forEach((cellType, x) => {
        if (cellType >= 2) {
          // Room numbers start from 2
          if (!this.dungeon.rooms[cellType]) {
            // Upper-Left Room Corner
            if (this.dungeonPlan[y][x - 1] === 0) {
              // Bridge found
              this.dungeon.rooms[cellType] = {
                y,
                x: x - 1,
                width: 0,
                height: 0,
              };
            } else {
              // Wall found
              this.dungeon.rooms[cellType] = { x, y, width: 0, height: 0 };
            }
          } else if (
            this.dungeonPlan[y + 1][x] !== cellType &&
            this.dungeon.rooms[cellType].width
          ) {
            // Room Height
            const { width } = this.dungeon.rooms[cellType];

            if (
              this.dungeonPlan[y + 1][
                this.dungeon.rooms[cellType].x + width
              ] === 1
            ) {
              // Wall found
              this.dungeon.rooms[cellType] = {
                ...this.dungeon.rooms[cellType],
                height: y - this.dungeon.rooms[cellType].y + 1,
              };
            } else {
              // Bridge found
              this.dungeon.rooms[cellType] = {
                ...this.dungeon.rooms[cellType],
                height: y - this.dungeon.rooms[cellType].y,
              };
            }
            // Room Width
          } else if (this.dungeonPlan[y][x + 1] !== cellType) {
            if (this.dungeonPlan[y][x + 1] === 1) {
              // Wall found
              this.dungeon.rooms[cellType] = {
                ...this.dungeon.rooms[cellType],
                width: x - this.dungeon.rooms[cellType].x + 1,
              };
            } else {
              // Bridge found
              this.dungeon.rooms[cellType] = {
                ...this.dungeon.rooms[cellType],
                width: x - this.dungeon.rooms[cellType].x,
              };
            }
          }
        }
      });
    });
  }
}
