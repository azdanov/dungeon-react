// @flow
import NewDungeon from 'random-dungeon-generator';
import Dungeon, { chooseCellType } from './DungeonKeeper';
import dungeonMock from './__mocks__/dungeon';
import Creature from './Creature';
import DungeonMaster from './DungeonMaster';

jest.mock('random-dungeon-generator');

const newDungeonMock = jest.fn(() => dungeonMock);

describe('chooseCellType()', () => {
  it("bridge for '0'", () => {
    expect(chooseCellType('0')).toBe('bridge');
  });
  it("wall for '1'", () => {
    expect(chooseCellType('1')).toBe('wall');
  });
  it("player for 'p'", () => {
    expect(chooseCellType('p')).toBe('player');
  });
  it("enemy for 'e'", () => {
    expect(chooseCellType('e')).toBe('enemy');
  });
});

describe('Dungeon', () => {
  let d;
  let dm;
  beforeAll(() => {
    NewDungeon.mockImplementation(newDungeonMock);
    dm = new DungeonMaster();
    d = new Dungeon();
  });

  it('is an instanceof Dungeon', () => {
    expect(d).toBeInstanceOf(Dungeon);
  });
  it('NewDungeon is called', () => {
    expect(newDungeonMock).toHaveBeenCalled();
  });
  it('has a dungeonPlan as an Array', () => {
    expect(d.dungeonPlan.constructor).toBe(Array);
  });

  describe('addPlayer()', () => {
    it('adds a player to dungeon', () => {
      expect(dm.dungeonKeeper.dungeon.player).toBeInstanceOf(Creature);
    });

    describe('pickPlayerLocation()', () => {
      it('picks a location for player', () => {
        if (dm.dungeonKeeper.dungeon.player) {
          const { x: pX, y: pY } = dm.dungeonKeeper.dungeon.player.location;
          expect(
            dm.dungeonKeeper.dungeon.map[pY][pX].occupiedBy,
          ).toBeInstanceOf(Creature);
        }
      });
    });
  });

  describe('changeOccupation()', () => {
    let oldX;
    let oldY;
    let newX;
    let newY;
    beforeAll(() => {
      d.addPlayer(new Creature());
      if (!d.dungeon.player) throw new Error();
      oldX = d.dungeon.player.location.x;
      oldY = d.dungeon.player.location.y;

      d.movePlayer('down');

      if (!d.dungeon.player) throw new Error();
      newX = d.dungeon.player.location.x;
      newY = d.dungeon.player.location.y;
    });
    it('set new location', () => {
      d.changeOccupation(oldX, oldY, newX, newY);
      if (!d.dungeon.player) throw new Error();
      expect(d.dungeon.player.location).toHaveProperty('x', oldX);
      if (!d.dungeon.player) throw new Error();
      expect(d.dungeon.player.location).toHaveProperty('y', oldY);
    });
    it('reset old location', () => {
      d.changeOccupation(oldX, oldY, newX, newY);
      expect(d.dungeon.map[newY][newX].occupiedBy).toBeNull();
    });
  });

  describe('isOccupiedBy()', () => {
    it('is occupied by creature', () => {
      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      const { x, y } = dm.dungeonKeeper.dungeon.player.location;
      expect(dm.dungeonKeeper.isOccupiedBy(x, y)).toBeInstanceOf(Creature);
    });
    it('is occupied by a wall', () => {
      expect(dm.dungeonKeeper.isOccupiedBy(0, 0)).toBe('wall');
    });
  });

  describe('addEnemies()', () => {
    it('adds an enemies array to dungeon', () => {
      if (dm.dungeonKeeper.dungeon.enemies)
        expect(dm.dungeonKeeper.dungeon.enemies.constructor).toBe(Array);
      else throw new Error('No enemies array');
    });
  });

  describe('pickPlayerLocation()', () => {
    it("picks a 'X' for player", () => {
      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      expect(dm.dungeonKeeper.dungeon.player.location).toHaveProperty(
        'x',
        expect.any(Number),
      );
    });
    it("picks a 'Y' for player", () => {
      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      expect(dm.dungeonKeeper.dungeon.player.location).toHaveProperty(
        'y',
        expect.any(Number),
      );
    });
  });

  describe('setOccupation()', () => {
    const x = 1;
    const y = 2;
    const type = 'player';
    const symbol = 'P';
    const player = new Creature('Test', type);
    beforeAll(() => {
      d.setOccupation(player, x, y);
    });
    it('occupies a cell', () => {
      expect(d.dungeon.map[y][x].occupiedBy).toBe(player);
    });
    it('has a type', () => {
      expect(d.dungeon.map[y][x].type).toBe(type);
    });
    it('has a symbol', () => {
      expect(d.dungeon.map[y][x].symbol).toBe(symbol);
    });

    describe('frees occupied cell', () => {
      let cT;
      let initialType;
      let initialSymbol;

      beforeAll(() => {
        cT = String(d.dungeonPlan[y][x]);
        initialType = chooseCellType(cT);
        initialSymbol = cT;
        d.setOccupation(null, x, y);
      });
      it('occupation is null', () => {
        expect(d.dungeon.map[y][x].occupiedBy).toBe(null);
      });
      it('type is reset', () => {
        expect(d.dungeon.map[y][x].type).toBe(initialType);
      });
      it('symbol is reset', () => {
        expect(d.dungeon.map[y][x].symbol).toBe(initialSymbol);
      });
    });
  });

  describe('createMap()', () => {
    it('creates a map array ', () => {
      expect(d.dungeon.map.constructor).toBe(Array);
    });
    describe('cell', () => {
      it('cell has symbol', () => {
        expect(d.dungeon.map[0][0]).toHaveProperty(
          'symbol',
          expect.any(String),
        );
      });
      it('cell has type', () => {
        expect(d.dungeon.map[0][0]).toHaveProperty('type', expect.any(String));
      });
    });
  });

  describe('movePlayer()', () => {
    beforeAll(() => {
      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      const { x, y } = dm.dungeonKeeper.dungeon.player.location;
      dm.dungeonKeeper.setOccupation(dm.dungeonKeeper.dungeon.player, 2, 2);
      dm.dungeonKeeper.setOccupation(null, x, y);
    });
    it('player moves up', () => {
      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      const { x: oldX, y: oldY } = dm.dungeonKeeper.dungeon.player.location;

      dm.movePlayer('up');

      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      const { x: newX, y: newY } = dm.dungeonKeeper.dungeon.player.location;

      expect(newX).toBe(oldX);
      expect(newY).toBe(oldY - 1);
    });
    it('player moves down', () => {
      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      const { x: oldX, y: oldY } = dm.dungeonKeeper.dungeon.player.location;

      dm.movePlayer('down');

      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      const { x: newX, y: newY } = dm.dungeonKeeper.dungeon.player.location;

      expect(newX).toBe(oldX);
      expect(newY).toBe(oldY + 1);
    });
    it('player moves left', () => {
      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      const { x: oldX, y: oldY } = dm.dungeonKeeper.dungeon.player.location;

      dm.movePlayer('left');

      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      const { x: newX, y: newY } = dm.dungeonKeeper.dungeon.player.location;

      expect(newX).toBe(oldX - 1);
      expect(newY).toBe(oldY);
    });
    it('player moves right', () => {
      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      const { x: oldX, y: oldY } = dm.dungeonKeeper.dungeon.player.location;

      dm.movePlayer('right');

      if (!dm.dungeonKeeper.dungeon.player) throw new Error();
      const { x: newX, y: newY } = dm.dungeonKeeper.dungeon.player.location;

      expect(newX).toBe(oldX + 1);
      expect(newY).toBe(oldY);
    });
  });

  describe('findRooms()', () => {
    let room;

    it('has a rooms object', () => {
      expect(d.dungeon.rooms.constructor).toBe(Object);
    });

    describe('simple room', () => {
      beforeAll(() => {
        room = 2;
      });
      it('room 2: X', () => {
        expect(d.dungeon.rooms[2].x).toBe(1);
      });
      it('room 2: Y', () => {
        expect(d.dungeon.rooms[2].y).toBe(1);
      });
      it('room 2: Width', () => {
        expect(d.dungeon.rooms[2].width).toBe(15);
      });
      it('room 2: Height', () => {
        expect(d.dungeon.rooms[2].height).toBe(4);
      });
    });

    describe('bridge on the right upper corner', () => {
      beforeAll(() => {
        room = 3;
      });
      it('room 3: X', () => {
        expect(d.dungeon.rooms[room].x).toBe(18);
      });
      it('room 3: Y', () => {
        expect(d.dungeon.rooms[room].y).toBe(1);
      });
      it('room 3: Width', () => {
        expect(d.dungeon.rooms[room].width).toBe(13);
      });
      it('room 3: Height', () => {
        expect(d.dungeon.rooms[room].height).toBe(4);
      });
    });

    describe('bridge on the left upper corner', () => {
      beforeAll(() => {
        room = 4;
      });
      it('room 4: X', () => {
        expect(d.dungeon.rooms[room].x).toBe(33);
      });
      it('room 4: Y', () => {
        expect(d.dungeon.rooms[room].y).toBe(1);
      });
      it('room 4: Width', () => {
        expect(d.dungeon.rooms[room].width).toBe(16);
      });
      it('room 4: Height', () => {
        expect(d.dungeon.rooms[room].height).toBe(4);
      });
    });

    describe('bridge on the right lower corner', () => {
      beforeAll(() => {
        room = 10;
      });
      it('room 10: X', () => {
        expect(d.dungeon.rooms[room].x).toBe(11);
      });
      it('room 10: Y', () => {
        expect(d.dungeon.rooms[room].y).toBe(22);
      });
      it('room 10: Width', () => {
        expect(d.dungeon.rooms[room].width).toBe(10);
      });
      it('room 10: Height', () => {
        expect(d.dungeon.rooms[room].height).toBe(8);
      });
    });
  });
});
