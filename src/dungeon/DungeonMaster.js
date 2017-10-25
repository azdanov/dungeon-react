// @flow

import { uniqueId, random } from 'lodash';
import Dungeon from './DungeonKeeper';
import Creature from './Creature';

export default class DungeonMaster {
  dungeonKeeper: Dungeon;
  constructor() {
    this.dungeonKeeper = new Dungeon();
    this.createPlayer();
    this.createEnemies();
  }

  createPlayer() {
    const player = new Creature('Player', 'player', 100, 10);
    this.dungeonKeeper.addPlayer(player);
  }

  createEnemies() {
    const enemies = [];
    const totalRooms = Object.keys(this.dungeonKeeper.dungeon.rooms).length;
    const delta = random(4);
    for (let i = 0; i < totalRooms + delta; i++) {
      enemies.push(
        new Creature(
          uniqueId('goblin_'),
          'enemy',
          random(50, 150),
          random(5, 15),
        ),
      );
    }

    this.dungeonKeeper.addEnemies(enemies);
  }

  movePlayer(direction: string) {
    switch (direction) {
      case 'up':
        this.dungeonKeeper.movePlayer('up');
        break;
      case 'down':
        this.dungeonKeeper.movePlayer('down');
        break;
      case 'left':
        this.dungeonKeeper.movePlayer('left');
        break;
      case 'right':
        this.dungeonKeeper.movePlayer('right');
        break;
      default:
        break;
    }
  }
}
