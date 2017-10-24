// @flow

class Creature {
  name: string;
  type: string;
  health: number;
  strength: number;
  location: { x: number, y: number };

  constructor(
    name: string = 'Creature',
    type: string = 'Creature',
    health: number = 100,
    strength: number = 10,
  ) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.strength = strength;
  }

  setLocation(x: number, y: number) {
    this.location = { x, y };
  }
}

export default Creature;
