// @flow
import Chance from 'chance';

const chance = new Chance();

class Creature {
  name: string;
  type: string;
  health: number;
  initialHealth: number;
  strength: number;
  experience: number;
  level: number;
  weapon: {
    id: number,
    power: number,
  };
  location: { x: number, y: number };
  levelThreshold: number;

  constructor(
    name: string = 'Creature',
    type: string = 'Creature',
    health?: number,
    strength?: number,
  ) {
    this.name = name;
    this.type = type;
    this.health = health || chance.integer({ min: 100, max: 160 });
    this.initialHealth = this.health;
    this.strength = strength || chance.integer({ min: 10, max: 25 });
    this.experience = 0;
    this.level = 0;
    this.levelThreshold = 100;
    this.weapon = {
      id: chance.integer({ min: 0, max: 10 }),
      power: chance.integer({ min: 5, max: 40 }),
    };
  }

  setLocation(x: number, y: number) {
    this.location = { x, y };
  }

  attack(opponent: Creature) {
    const damage = chance.integer({
      min: this.strength / 2,
      max: this.weapon.power + this.strength,
    });

    opponent.receiveDamage(damage);
    return {
      who: this,
      opponent,
      damage,
      opponentDead: opponent.isDead(),
      levelUp: this.receiveExperience(damage),
    };
  }

  isDead() {
    return this.health <= 0;
  }

  receiveDamage(damage: number) {
    this.health -= damage;
  }

  receiveExperience(experience: number) {
    this.experience += chance.integer({ min: experience / 2, max: experience });
    if (this.experience > this.levelThreshold) {
      this.level += 1;
      this.health =
        this.initialHealth +
        chance.integer({
          min: 10 + this.level / 2,
          max: 30 + this.level / 2,
        });
      this.strength += chance.integer({
        min: 5 + this.level / 2,
        max: 15 + this.level / 2,
      });
      this.experience %= this.levelThreshold;
      this.levelThreshold *= 1.5;
      return true;
    }
    return false;
  }
}

export default Creature;
