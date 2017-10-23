// @flow
import React, { Component } from 'react';
import { throttle } from 'lodash';
import Map from './Map';
import type DungeonMaster from '../dungeon/DungeonMaster';

type Props = {
  dungeonMaster: DungeonMaster,
};

class Game extends Component<Props> {
  componentDidMount() {
    // Flow requires window.document
    window.document.addEventListener(
      'keydown',
      throttle(this.handleKeyDown, 100, { leading: true, trailing: true }),
      false,
    );
  }
  componentWillUnmount() {
    // Flow requires window.document
    window.document.removeEventListener(
      'keydown',
      throttle(this.handleKeyDown, 100, { leading: true, trailing: true }),
      false,
    );
  }

  handleKeyDown = (e: SyntheticKeyboardEvent<>) => {
    e.preventDefault();
    const key = e.key || e.which;
    switch (key) {
      case 'w':
      case 'W':
      case 'ArrowUp':
      case 38:
        console.log('Up');
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
      case 40:
        console.log('Down');
        break;
      case 'a':
      case 'A':
      case 'ArrowLeft':
      case 37:
        console.log('Left');
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
      case 39:
        console.log('Right');
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
  };

  render() {
    return (
      <div className="app">
        <Map dungeonMaster={this.props.dungeonMaster} />
      </div>
    );
  }
}

export default Game;
