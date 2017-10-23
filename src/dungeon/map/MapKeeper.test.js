// @flow
import NewDungeon from 'random-dungeon-generator';
import MapKeeper from './MapKeeper';
import dungeon from '../__mocks__/dungeon';

jest.mock('random-dungeon-generator');

const newDungeonMock = jest.fn(() => dungeon);

describe('MapKeeper', () => {
  let mapKeeper;
  beforeAll(() => {
    NewDungeon.mockImplementation(newDungeonMock);
    mapKeeper = new MapKeeper();
  });
  it('is an instanceof MapKeeper', () => {
    expect(mapKeeper).toBeInstanceOf(MapKeeper);
  });
  it('NewDungeon is called', () => {
    expect(newDungeonMock).toHaveBeenCalled();
  });
  it('has a dungeon Array', () => {
    expect(mapKeeper.dungeon.constructor).toBe(Array);
  });

  describe('findRooms()', () => {
    let room;

    describe('simple room', () => {
      beforeAll(() => {
        room = 2;
      });
      it('room 2: X', () => {
        expect(mapKeeper.rooms[2].x).toBe(1);
      });
      it('room 2: Y', () => {
        expect(mapKeeper.rooms[2].y).toBe(1);
      });
      it('room 2: Width', () => {
        expect(mapKeeper.rooms[2].width).toBe(15);
      });
      it('room 2: Height', () => {
        expect(mapKeeper.rooms[2].height).toBe(4);
      });
    });

    describe('bridge on the right upper corner', () => {
      beforeAll(() => {
        room = 3;
      });
      it('room 3: X', () => {
        expect(mapKeeper.rooms[room].x).toBe(18);
      });
      it('room 3: Y', () => {
        expect(mapKeeper.rooms[room].y).toBe(1);
      });
      it('room 3: Width', () => {
        expect(mapKeeper.rooms[room].width).toBe(13);
      });
      it('room 3: Height', () => {
        expect(mapKeeper.rooms[room].height).toBe(4);
      });
    });

    describe('bridge on the left upper corner', () => {
      beforeAll(() => {
        room = 4;
      });
      it('room 4: X', () => {
        expect(mapKeeper.rooms[room].x).toBe(33);
      });
      it('room 4: Y', () => {
        expect(mapKeeper.rooms[room].y).toBe(1);
      });
      it('room 4: Width', () => {
        expect(mapKeeper.rooms[room].width).toBe(16);
      });
      it('room 4: Height', () => {
        expect(mapKeeper.rooms[room].height).toBe(4);
      });
    });

    describe('bridge on the right lower corner', () => {
      beforeAll(() => {
        room = 10;
      });
      it('room 10: X', () => {
        expect(mapKeeper.rooms[room].x).toBe(11);
      });
      it('room 10: Y', () => {
        expect(mapKeeper.rooms[room].y).toBe(22);
      });
      it('room 10: Width', () => {
        expect(mapKeeper.rooms[room].width).toBe(10);
      });
      it('room 10: Height', () => {
        expect(mapKeeper.rooms[room].height).toBe(8);
      });
    });
  });
});
