// @flow

import Creature from './Creature';

describe('Creature', () => {
  let creature;
  const name = 'Being';
  const type = 'TestBeing';
  const health = 100;
  const strength = 10;
  beforeAll(() => {
    creature = new Creature(name, type, health, strength);
  });
  it('is an instanceof Creature', () => {
    expect(creature).toBeInstanceOf(Creature);
  });
  it('has a name', () => {
    expect(creature.name).toBe(name);
  });
  it('has a type', () => {
    expect(creature.type).toBe(type);
  });
  it('has health', () => {
    expect(creature.health).toBe(health);
  });
  it('has strength', () => {
    expect(creature.strength).toBe(strength);
  });

  describe('setLocation()', () => {
    beforeAll(() => {
      creature.setLocation(1, 2);
    });
    it('sets creatures x location', () => {
      expect(creature.location.x).toBe(1);
    });
    it('sets creatures y location', () => {
      expect(creature.location.y).toBe(2);
    });
  });
});
