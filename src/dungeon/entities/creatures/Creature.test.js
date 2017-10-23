// @flow

import Creature from './Creature';
import direction from '../../map/directions';

describe('Creature', () => {
  let creature;
  beforeAll(() => {
    creature = new Creature('Creature', 'Creature', 100, 10, { x: 1, y: 1 });
  });
  it('is an instanceof Creature', () => {
    expect(creature).toBeInstanceOf(Creature);
  });
  it('has a name', () => {
    expect(creature.name).toBe('Creature');
  });
  it('has a type', () => {
    expect(creature.name).toBe('Creature');
  });
  it('has health', () => {
    expect(creature.health).toBe(100);
  });
  it('has strength', () => {
    expect(creature.strength).toBe(10);
  });

  describe('has a location', () => {
    it('has a location as an object', () => {
      expect(creature.location.constructor).toBe(Object);
    });
    it('has an x', () => {
      expect(creature.location).toHaveProperty('x', expect.any(Number));
    });
    it('has an y', () => {
      expect(creature.location).toHaveProperty('y', expect.any(Number));
    });
  });

  describe('move()', () => {
    beforeEach(() => {
      creature = new Creature('Creature', 'Creature', 100, 10, { x: 1, y: 1 });
    });
    it('moves north', () => {
      creature.move(direction.north);
      expect(creature.location).toHaveProperty('x', 1);
      expect(creature.location).toHaveProperty('y', 0);
    });
    it('moves south', () => {
      creature.move(direction.south);
      expect(creature.location).toHaveProperty('x', 1);
      expect(creature.location).toHaveProperty('y', 2);
    });
    it('moves east', () => {
      creature.move(direction.east);

      expect(creature.prevLocation).toHaveProperty('x', 1);
      expect(creature.prevLocation).toHaveProperty('y', 1);
    });
    it('moves west', () => {
      creature.move(direction.west);
      expect(creature.location).toHaveProperty('x', 0);
      expect(creature.location).toHaveProperty('y', 1);
    });
    it('saves previous location', () => {
      creature.move(direction.north);
      expect(creature.prevLocation).toHaveProperty('x', 1);
      expect(creature.prevLocation).toHaveProperty('y', 1);
    });
  });
});
