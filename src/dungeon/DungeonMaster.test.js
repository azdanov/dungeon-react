// @flow
import NewDungeon from 'random-dungeon-generator';
import DungeonMaster from './DungeonMaster';
import Dungeon from './DungeonKeeper';
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
  it('is has a d of type Dungeon', () => {
    expect(dm.dungeonKeeper).toBeInstanceOf(Dungeon);
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
});
