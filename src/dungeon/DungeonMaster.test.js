// @flow
import NewDungeon from 'random-dungeon-generator';
import DungeonMaster from './DungeonMaster';
import DungeonKeeper from './DungeonKeeper';
import dungeonMock from './__mocks__/dungeon';
import Creature from './Creature';

jest.mock('random-dungeon-generator');

const newDungeonMock = jest.fn(() => dungeonMock);

describe('DungeonMaster', () => {
  let dm;

  beforeAll(() => {
    NewDungeon.mockImplementation(newDungeonMock);
    dm = new DungeonMaster();
  });

  it('is an instanceof DungeonMaster', () => {
    expect(dm).toBeInstanceOf(DungeonMaster);
  });

  it('has a dungeon of type DungeonKeeper', () => {
    expect(dm.dungeonKeeper).toBeInstanceOf(DungeonKeeper);
  });

  it('has player', () => {
    expect(dm).toHaveProperty('player', expect.any(Creature));
  });

  it('has log', () => {
    expect(dm).toHaveProperty('log', expect.any(Array));
  });

  it('has a zone', () => {
    expect(dm).toHaveProperty('zone', expect.any(Number));
  });

  describe('createPlayer()', () => {
    it('creates a player', () => {
      expect(dm.dungeonKeeper.dungeon.player).toBeInstanceOf(Creature);
    });
  });

  describe('createEnemies()', () => {
    it('creates an Array', () => {
      if (dm.dungeonKeeper.dungeon.enemies)
        expect(dm.dungeonKeeper.dungeon.enemies.constructor).toBe(Array);
      else throw new Error('Enemies array not found');
    });
  });

  describe('createMessage()', () => {
    let c1;
    let c2;

    beforeAll(() => {
      c1 = new Creature();
      c2 = new Creature();
    });

    it('creates a normal message', () => {
      dm.createMessage({
        who: c1,
        opponent: c2,
        damage: 10,
        levelUp: false,
        opponentDead: false,
      });
      const message = dm.log.shift();
      expect(message).toBe(`${c1.name} attacked ${c2.name} for 10 damage.`);
    });

    it('creates a killing message', () => {
      dm.createMessage({
        who: c1,
        opponent: c2,
        damage: 10,
        levelUp: false,
        opponentDead: true,
      });
      const message = dm.log.shift();
      expect(message).toBe(
        `${c1.name} attacked ${c2.name} for 10 damage. Killed his opponent.`,
      );
    });

    it('creates a normal message', () => {
      dm.createMessage({
        who: c1,
        opponent: c2,
        damage: 10,
        levelUp: true,
        opponentDead: false,
      });
      const message = dm.log.shift();
      expect(message).toBe(
        `${c1.name} attacked ${c2.name} for 10 damage. And received a level up!`,
      );
    });
  });
});
