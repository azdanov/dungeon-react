// @flow

import Creature from './Creature';

describe('Creature', () => {
  let creature;
  let creature2;
  const name = 'Being';
  const name2 = 'Being2';
  const type = 'TestBeing';
  const type2 = 'TestBeing2';
  const health = 100;
  const strength = 10;

  beforeAll(() => {
    creature = new Creature(name, type, health, strength);
    creature2 = new Creature(name2, type2, health, strength);
  });

  it('is an instanceof Creature', () => {
    expect(creature).toBeInstanceOf(Creature);
  });

  it('has a name', () => {
    expect(creature).toHaveProperty('name', name);
  });

  it('has a type', () => {
    expect(creature).toHaveProperty('type', type);
  });

  it('has health', () => {
    expect(creature).toHaveProperty('health', health);
  });

  it('has strength', () => {
    expect(creature).toHaveProperty('strength', strength);
  });

  it('has experience', () => {
    expect(creature).toHaveProperty('experience', 0);
  });

  it('has level', () => {
    expect(creature).toHaveProperty('level', 0);
  });

  it('has levelThreshold', () => {
    expect(creature).toHaveProperty('levelThreshold', 100);
  });

  it('has a weapon', () => {
    expect(creature).toHaveProperty('weapon');
    expect(creature.weapon).toHaveProperty('id', expect.any(Number));
    expect(creature.weapon).toHaveProperty('power', expect.any(Number));
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

  describe('attack()', () => {
    let c2Health;
    let c2HealthAfter;
    let summary;

    beforeAll(() => {
      c2Health = creature2.health;
      summary = creature.attack(creature2);
      c2HealthAfter = creature2.health;
    });

    it('reduce health of opponent', () => {
      expect(c2HealthAfter).toBeLessThan(c2Health);
    });

    it('return a summary of attack', () => {
      expect(summary).toHaveProperty('who', expect.any(Creature));
      expect(summary).toHaveProperty('opponent', expect.any(Creature));
      expect(summary).toHaveProperty('damage', expect.any(Number));
      expect(summary).toHaveProperty('opponentDead', expect.any(Boolean));
      expect(summary).toHaveProperty('levelUp', expect.any(Boolean));
    });
  });

  describe('isDead()', () => {
    beforeAll(() => {
      creature.health = 0;
    });

    afterAll(() => {
      creature.health = 100;
    });

    it('is dead', () => {
      expect(creature.isDead()).toBeTruthy();
    });
  });

  describe('receiveDamage()', () => {
    let healthBefore;
    let damage;

    beforeAll(() => {
      damage = 20;
      healthBefore = creature.health;
      creature.receiveDamage(damage);
    });

    it('receives damage', () => {
      expect(creature.health).toBe(healthBefore - damage);
    });
  });

  describe('receiveExperience()', () => {
    let levelup;

    beforeAll(() => {
      creature.experience = 0;
      creature.level = 0;
      levelup = creature.receiveExperience(20);
    });

    it('receives experience', () => {
      expect(creature.experience).toBeLessThanOrEqual(20);
      expect(levelup).toBeFalsy();
    });

    it('receives a levelup', () => {
      levelup = creature.receiveExperience(200);
      expect(creature.level).toBe(1);
      expect(levelup).toBeTruthy();
    });
  });
});
