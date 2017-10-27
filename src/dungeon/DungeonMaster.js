/* eslint-disable prefer-destructuring */
// @flow

import Chance from 'chance';
import Creature from './Creature';
import Item from './Item';
import DungeonKeeper from './DungeonKeeper';

const chance = new Chance();

export default class DungeonMaster {
  dungeonKeeper: DungeonKeeper;
  player: Creature;
  log: Array<string>;
  zone: number;

  constructor() {
    this.dungeonKeeper = new DungeonKeeper();
    this.log = [];
    this.zone = 1;
    this.createPlayer();
    this.createEnemies();
    this.createItems();
    this.log.push(`Welcome to the dungeons ${this.player.name}!`);
    this.log.push(
      'Use arrow keys to move, pick items, fight enemies and reach the final boss.',
    );
  }

  createPlayer(player?: Creature) {
    this.player = new Creature(chance.name(), 'player');
    this.dungeonKeeper.addPlayer(player || this.player);
  }

  createEnemies() {
    const enemies = [];
    const totalRooms = Object.keys(this.dungeonKeeper.dungeon.rooms).length;
    const delta = chance.integer({ min: 0, max: 8 }) * this.zone;
    for (let i = 0; i < totalRooms + delta; i++) {
      enemies.push(
        new Creature(
          chance.word(),
          'enemy',
          chance.integer({ min: 50 + delta, max: 130 + delta }),
          chance.integer({ min: 5 + delta, max: (10 + delta) * this.zone }),
        ),
      );
    }

    this.dungeonKeeper.addEnemies(enemies);
  }

  createItems() {
    const items = [];
    const totalRooms = Object.keys(this.dungeonKeeper.dungeon.rooms).length;
    const delta = chance.integer({ min: 0, max: 8 });

    for (let i = 0; i < totalRooms + delta; i++) {
      items.push(new Item(Math.random() < 0.5 ? 'health' : 'strength'));
    }

    for (let i = 0; i < 3 + delta; i++) {
      items.push(new Item('weapon'));
    }

    items.push(new Item('next_level'));

    this.dungeonKeeper.addItems(items);
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

  interactWith(direction: string, obstacle: Creature | Item | string) {
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
    } else if (obstacle instanceof Item) {
      switch (obstacle.type) {
        case 'health':
          this.player.health = this.player.initialHealth + obstacle.item.amount;
          break;
        case 'strength':
          this.player.strength = this.player.strength + obstacle.item.amount;
          break;
        case 'weapon':
          this.player.weapon = {
            ...this.player.weapon,
            id: obstacle.item.id,
            power: this.player.weapon.power + obstacle.item.amount,
          };
          break;
        case 'next_level':
          this.nextZone();
          break;
        default:
          break;
      }

      this.createMessage({ who: this.player, item: obstacle });
    }
  }

  createMessage(outcome: {
    who: Creature,
    item?: Item,
    opponent?: Creature,
    damage?: number,
    levelUp?: boolean,
    opponentDead?: boolean,
  }) {
    let message = '';
    if (outcome.opponent && outcome.damage) {
      message = `${outcome.who.name} attacked 
    ${outcome.opponent.name} for ${outcome.damage} damage.`;
      if (outcome.opponentDead) {
        message += ' Killed his opponent.';
      }
      if (outcome.levelUp) {
        message += ' And received a level up!';
      }
    } else if (outcome.item) {
      let amount = 'some';
      let type = 'mysterious;';
      if (outcome.item.item.amount) {
        amount = outcome.item.item.amount;
      }
      if (outcome.item.type) {
        type = outcome.item.type;
      }
      switch (outcome.item.type) {
        case 'health':
          message = `${outcome.who
            .name} has found a ${type} potion that added ${amount} points to health.`;
          break;
        case 'strength':
          message = `${outcome.who
            .name} has found a ${type} potion that added ${amount} points to strength.`;
          break;
        case 'weapon':
          message = `${outcome.who
            .name} has found a ${type} weapon that added ${amount} points to the weapon.`;
          break;
        default:
          break;
      }
    }
    this.log.push(message);
  }

  nextZone() {
    this.zone += 1;
    this.log.push('You have entered a new area!');
    this.dungeonKeeper = new DungeonKeeper();
    this.createPlayer(this.player);
    this.createEnemies();
    this.createItems();
  }
}
