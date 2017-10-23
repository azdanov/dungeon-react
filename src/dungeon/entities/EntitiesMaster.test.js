// @flow
import NewDungeon from 'random-dungeon-generator';
import EntitiesMaster from './EntitiesMaster';
import MapKeeper from '../map/MapKeeper';
import dungeon from '../__mocks__/dungeon';

jest.mock('random-dungeon-generator');

const newDungeonMock = jest.fn(() => dungeon);
const player = {
  health: 100,
  name: 'Player',
  strength: 10,
  type: 'player',
};

describe('EntitiesMaster', () => {
  let entitiesMaster;
  let mapKeeper;

  beforeAll(() => {
    NewDungeon.mockImplementation(newDungeonMock);
    mapKeeper = new MapKeeper();
    entitiesMaster = new EntitiesMaster(mapKeeper.rooms);
  });
  it('is an instanceof EntitiesMaster', () => {
    expect(entitiesMaster).toBeInstanceOf(EntitiesMaster);
  });

  describe('init()', () => {
    it('initializes entities object', () => {
      expect(entitiesMaster.entities.constructor).toBe(Object);
    });
  });

  describe('createPlayer()', () => {
    it('creates a player', () => {
      expect(entitiesMaster.entities.player).toMatchObject(player);
    });

    it('picks an X for player', () => {
      if (entitiesMaster.entities.player)
        expect(entitiesMaster.entities.player.location).toHaveProperty(
          'x',
          expect.any(Number),
        );
    });

    it('picks a Y for player', () => {
      if (entitiesMaster.entities.player)
        expect(entitiesMaster.entities.player.location).toHaveProperty(
          'y',
          expect.any(Number),
        );
    });
  });
});
