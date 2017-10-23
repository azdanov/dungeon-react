// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Cell, { getClassName, pickSymbol } from './Cell';
import { PLAYER_S } from '../dungeon/map/mapSymbols';

describe('Cell', () => {
  describe('getClassName()', () => {
    it('default room', () => {
      expect(getClassName()).toBe('cell room');
    });
    it('returns bridge for 0', () => {
      expect(getClassName(0)).toBe('cell bridge');
    });
    it('returns wall for 1', () => {
      expect(getClassName(1)).toBe('cell wall');
    });
    it("returns player for 'P'", () => {
      expect(getClassName('P')).toBe('cell player');
    });
    it("returns enemy for 'E'", () => {
      expect(getClassName('E')).toBe('cell enemy');
    });
    it("returns health for 'H'", () => {
      expect(getClassName('H')).toBe('cell health');
    });
    it("returns strength for 'S'", () => {
      expect(getClassName('S')).toBe('cell strength');
    });
  });

  describe('pickSymbol()', () => {
    it('pick symbol for player', () => {
      expect(pickSymbol(PLAYER_S)).toBe('☺');
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Cell cell={0} rowIndex={0} cellIndex={0} />, div);
  });
});
