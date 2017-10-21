// @flow
class Creature {
  name: string;
  health: number;
  strength: number;
  location: {
    x: number,
    y: number,
  };
  constructor(
    name: string = 'Creature',
    health: number = 100,
    strength: number = 10,
    location: { x: number, y: number } = { x: 0, y: 0 },
  ) {
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.location = location;
  }
}

export default Creature;
