// @flow
import React, { Component } from 'react';
import { throttle } from 'lodash';
import Map from './Map';
import type DungeonMaster from '../dungeon/DungeonMaster';
import directions from '../dungeon/map/directions';

type Props = {
  dungeonMaster: DungeonMaster,
};

type State = {
  dungeon: Array<Array<number | string>>,
};

class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dungeon: this.props.dungeonMaster.mapKeeper.dungeon,
    };
  }

  componentDidMount() {
    // Flow requires window.document
    window.document.addEventListener(
      'keydown',
      throttle(this.handleKeyDown, 200, { leading: true, trailing: false }),
      false,
    );
  }
  componentWillUnmount() {
    // Flow requires window.document
    window.document.removeEventListener(
      'keydown',
      throttle(this.handleKeyDown, 200, { leading: true, trailing: false }),
      false,
    );
  }

  handleKeyDown = (e: SyntheticKeyboardEvent<>) => {
    e.preventDefault();
    const { north, south, west, east } = directions;
    const key = e.key || e.which;
    switch (key) {
      case 'w':
      case 'W':
      case 'ArrowUp':
      case 38:
        this.props.dungeonMaster.movePlayer(north);
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
      case 40:
        this.props.dungeonMaster.movePlayer(south);
        break;
      case 'a':
      case 'A':
      case 'ArrowLeft':
      case 37:
        this.props.dungeonMaster.movePlayer(west);
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
      case 39:
        this.props.dungeonMaster.movePlayer(east);
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
    this.setState(() => ({
      dungeon: this.props.dungeonMaster.mapKeeper.dungeon,
    }));
  };

  render() {
    return (
      <div className="app">
        <Map
          dungeonMaster={this.props.dungeonMaster}
          dungeon={this.state.dungeon}
        />
      </div>
    );
  }
}

export default Game;
