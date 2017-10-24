// @flow
import React, { Component } from 'react';
import { throttle, cloneDeep } from 'lodash';
import Map from './Map';
import DungeonMaster from '../dungeon/DungeonMaster';
import type { cell } from '../dungeon/DungeonKeeper';
import './Game.css';

type State = {
  dungeonMap: Array<Array<cell>>,
};

type Props = {};

class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.dungeonMaster = new DungeonMaster();
    this.state = { dungeonMap: this.dungeonMaster.dungeonKeeper.dungeon.map };
  }

  componentDidMount() {
    // Flow requires window.document
    window.document.addEventListener(
      'keydown',
      throttle(this.handleKeyDown, 150, { leading: true, trailing: false }),
      false,
    );
  }
  componentWillUnmount() {
    // Flow requires window.document
    window.document.removeEventListener(
      'keydown',
      throttle(this.handleKeyDown, 150, { leading: true, trailing: false }),
      false,
    );
  }
  dungeonMaster: DungeonMaster;

  handleKeyDown = (e: SyntheticKeyboardEvent<>) => {
    e.preventDefault();
    const key = e.key || e.which;
    switch (key) {
      case 'w':
      case 'W':
      case 'ArrowUp':
      case 38:
        this.dungeonMaster.movePlayer('up');
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
      case 40:
        this.dungeonMaster.movePlayer('down');
        break;
      case 'a':
      case 'A':
      case 'ArrowLeft':
      case 37:
        this.dungeonMaster.movePlayer('left');
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
      case 39:
        this.dungeonMaster.movePlayer('right');
        break;
      case 'Enter':
      case 13:
        console.log('Enter');
        break;
      case 'Escape':
      case 27:
        console.log('Escape');
        break;
      default:
        break;
    }
    this.setState(() => {
      const dungeonMap = cloneDeep(
        this.dungeonMaster.dungeonKeeper.dungeon.map,
      );
      return {
        dungeonMap,
      };
    });
  };

  render() {
    return (
      <div className="app">
        <Map dungeonMap={this.state.dungeonMap} />
      </div>
    );
  }
}

export default Game;
