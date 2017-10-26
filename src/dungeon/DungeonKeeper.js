// @flow

import Mrpas from 'mrpas';
import { random, head, tail, sample, keys, remove, isEqual } from 'lodash';
import { NewDungeon } from 'random-dungeon-generator';
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
  visible: boolean,
  visited?: boolean,
  transparent?: boolean,
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
  fovMap: Mrpas;

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
    this.createFovMap();
  }

  addPlayer(player: creatureType) {
    this.dungeon.player = player;
    this.pickPlayerLocation(player);
  }

  addEnemies(enemies: Array<creatureType>) {
    this.dungeon.enemies = enemies;
    this.pickEnemiesLocations(enemies);
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

  // TODO: TESTS!
  pickEnemiesLocations(enemies: Array<creatureType>) {
    const roomNums = tail(keys(this.dungeon.rooms));
    const dRooms = this.dungeon.rooms;
    const eLength = enemies.length;
    let i = 0;
    while (i < eLength) {
      const room = Number.parseInt(sample(roomNums), 10);
      const x = random(dRooms[room].x, dRooms[room].x + dRooms[room].width - 1);
      const y = random(
        dRooms[room].y,
        dRooms[room].y + dRooms[room].height - 1,
      );
      if (!this.isOccupiedBy(x, y)) {
        this.setOccupation(enemies[i], x, y);
        i += 1;
      }
    }
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

      if (creature.type === 'player') {
        this.resetVisibility(); // TODO: Optimization

        this.computeFov(x, y);
      }
      creature.setLocation(x, y);
    } else {
      // Reset location
      const cT = String(this.dungeonPlan[y][x]);
      this.dungeon.map[y][x] = {
        ...this.dungeon.map[y][x],
        type: chooseCellType(cT),
        symbol: cT,
        occupiedBy: null,
      };
    }
  }

  resetVisibility() {
    // TODO: Possible optimization
    // const limit = 5;
    // let topLeftX = x - limit < 0 ? 0 : x - limit;
    // let topLeftY = y - limit < 0 ? 0 : y - limit;
    // let bottomRightX = x + limit < 50 ? x + limit : 49;
    // let bottomRightY = y + limit < 50 ? y + limit : 49;
    //
    // console.log(bottomRightX, bottomRightY);
    // for (; topLeftY <= bottomRightY; topLeftY++) {
    //   for (; topLeftX <= bottomRightX; topLeftX++) {
    //     console.log(topLeftY, bottomRightY);
    //     this.dungeon.map[topLeftY][topLeftX].visible = false;
    //   }
    // }

    this.dungeon.map.forEach(row => {
      row.forEach(cellObj => {
        // eslint-disable-next-line no-param-reassign
        if (cellObj.visible) cellObj.visited = true;
        // eslint-disable-next-line no-param-reassign
        cellObj.visible = false;
      });
    });
  }

  createMap() {
    this.dungeonPlan.forEach((row, iY) => {
      row.forEach((cellType, iX) => {
        const cT = String(cellType);
        if (!this.dungeon.map[iY]) this.dungeon.map[iY] = [];
        this.dungeon.map[iY][iX] = {
          symbol: cT,
          type: chooseCellType(cT),
          transparent: cellType !== 1,
          visible: false,
          occupiedBy: undefined,
        };
      });
    });
  }

  createFovMap() {
    this.fovMap = new Mrpas(
      50,
      50,
      (x, y) => this.dungeon.map[y][x].transparent,
    );
  }

  computeFov(playerX: number, playerY: number, visionRadius: number = 5) {
    this.fovMap.compute(
      playerX,
      playerY,
      visionRadius,
      (x, y) => this.dungeon.map[y][x].visible,
      (x, y) => {
        this.dungeon.map[y][x].visible = true;
      },
    );
  }

  movePlayer(direction: string) {
    let offsetX = 0;
    let offsetY = 0;
    let newX;
    let newY;
    let obstacle = null;

    if (!this.dungeon.player) return obstacle;
    const { x, y } = this.dungeon.player.location;
    switch (direction) {
      case 'up':
        offsetY = -1;
        newX = x + offsetX;
        newY = y + offsetY;
        obstacle = this.isOccupiedBy(newX, newY);
        if (!obstacle) {
          this.changeOccupation(newX, newY, x, y);
        }
        break;
      case 'down':
        offsetY = 1;
        newX = x + offsetX;
        newY = y + offsetY;
        obstacle = this.isOccupiedBy(newX, newY);
        if (!obstacle) {
          this.changeOccupation(newX, newY, x, y);
        }
        break;
      case 'left':
        offsetX = -1;
        newX = x + offsetX;
        newY = y + offsetY;
        obstacle = this.isOccupiedBy(newX, newY);
        if (!obstacle) {
          this.changeOccupation(newX, newY, x, y);
        }
        break;
      case 'right':
        offsetX = 1;
        newX = x + offsetX;
        newY = y + offsetY;
        obstacle = this.isOccupiedBy(newX, newY);
        if (!obstacle) {
          this.changeOccupation(newX, newY, x, y);
        }
        break;
      default:
        break;
    }
    return obstacle;
  }

  changeOccupation(newX: number, newY: number, oldX: number, oldY: number) {
    this.setOccupation(this.dungeon.player, newX, newY);
    this.setOccupation(null, oldX, oldY);
  }

  isOccupiedBy(x: number, y: number) {
    if (this.dungeon.map[y][x].occupiedBy) {
      return this.dungeon.map[y][x].occupiedBy;
    } else if (this.dungeon.map[y][x].type === 'wall') {
      return this.dungeon.map[y][x].type;
    }
    return null;
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

  removeEnemy(enemyToRemove: creatureType) {
    this.setOccupation(
      null,
      enemyToRemove.location.x,
      enemyToRemove.location.y,
    );
    remove(this.dungeon.enemies, enemy => isEqual(enemy, enemyToRemove));
  }
}
