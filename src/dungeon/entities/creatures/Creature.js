// @flow
import directions from '../../map/moveOffsets';

class Creature {
  name: string;
  type: string;
  health: number;
  strength: number;
  location: {
    x: number,
    y: number,
  };
  constructor(
    name: string = 'Creature',
    type: string = 'Creature',
    health: number = 100,
    strength: number = 10,
    location: { x: number, y: number } = { x: 0, y: 0 },
  ) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.strength = strength;
    this.location = location;
  }

  move(direction: { x: number, y: number }) {
    this.location = {
      x: this.location.x + direction.x,
      y: this.location.y + direction.y,
    };
  }
}

export default Creature;
