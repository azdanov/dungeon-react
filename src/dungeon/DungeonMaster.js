// @flow

import Chance from 'chance';
import Creature from './Creature';
import Dungeon from './DungeonKeeper';

const chance = new Chance();

export default class DungeonMaster {
  dungeonKeeper: Dungeon;
  player: Creature;
  log: Array<string>;
  zone: number;

  constructor() {
    this.dungeonKeeper = new Dungeon();
    this.log = [];
    this.zone = 0;
    this.createPlayer();
    this.createEnemies();
    this.log.unshift('To survive...');
    this.log.unshift(`Welcome to the dungeons ${this.player.name}!`);
    this.log.unshift('Level up and Kill the Boss.');
  }

  createPlayer() {
    this.player = new Creature(chance.name(), 'player');
    this.dungeonKeeper.addPlayer(this.player);
  }

  createEnemies() {
    const enemies = [];
    const totalRooms = Object.keys(this.dungeonKeeper.dungeon.rooms).length;
    const delta = chance.integer({ min: 0, max: 8 });
    for (let i = 0; i < totalRooms + delta; i++) {
      enemies.push(
        new Creature(
          chance.word(),
          'enemy',
          chance.integer({ min: 50, max: 130 }),
          chance.integer({ min: 5, max: 10 }),
        ),
      );
    }

    this.dungeonKeeper.addEnemies(enemies);
  }

  movePlayer(direction: string) {
    let obstacle;
    switch (direction) {
      case 'up':
        obstacle = this.dungeonKeeper.movePlayer('up');
        break;
      case 'down':
        obstacle = this.dungeonKeeper.movePlayer('down');
        break;
      case 'left':
        obstacle = this.dungeonKeeper.movePlayer('left');
        break;
      case 'right':
        obstacle = this.dungeonKeeper.movePlayer('right');
        break;
      default:
        break;
    }
    if (obstacle) {
      this.interactWith(direction, obstacle);
    }
  }

  interactWith(direction: string, obstacle: Creature | string) {
    if (obstacle instanceof Creature) {
      const player = this.player.attack(obstacle);
      this.createMessage(player);
      let enemy;
      if (player.opponentDead) {
        this.dungeonKeeper.removeEnemy(obstacle);
      } else {
        enemy = obstacle.attack(this.player);
        this.createMessage(enemy);
      }
    }
    console.log(this.player.experience);
  }

  createMessage(outcome: {
    damage: number,
    opponentDead: boolean,
    levelUp: boolean,
    opponent: Creature,
    who: Creature,
  }) {
    let message = `${outcome.who.name} attacked ${outcome.opponent
      .name} for ${outcome.damage} damage.`;
    if (outcome.opponentDead) {
      message += ' Killed his opponent.';
    }
    if (outcome.levelUp) {
      message += ' And received a level up!';
    }
    this.log.unshift(message);
  }
}
