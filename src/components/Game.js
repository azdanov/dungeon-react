// @flow
import { throttle } from 'lodash';
import React, { Component } from 'react';
import type { cell } from '../dungeon/DungeonKeeper';
import DungeonMaster from '../dungeon/DungeonMaster';
import './Game.css';
import Map from './Map';
import UI from './UI';

type State = {
  gameOver: boolean,
  log: Array<string>,
  playerAlive: boolean,
  dungeonMap: Array<Array<cell>>,
};

type Props = {};

class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.dungeonMaster = new DungeonMaster();
    this.state = {
      gameOver: this.dungeonMaster.gameOver,
      log: this.dungeonMaster.log,
      playerAlive: true,
      dungeonMap: this.dungeonMaster.dungeonKeeper.dungeon.map,
    };
  }

  componentDidMount() {
    window.document.addEventListener(
      'keydown',
      throttle(this.handleKeyDown, 150, { leading: true, trailing: false }),
      false,
    );
  }

  componentWillUnmount() {
    window.document.removeEventListener(
      'keydown',
      throttle(this.handleKeyDown, 150, { leading: true, trailing: false }),
      false,
    );
  }

  dungeonMaster: DungeonMaster;

  handleKeyDown = (e: SyntheticKeyboardEvent<>) => {
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
      case 'r':
      case 'R':
        this.setState(() => {
          this.dungeonMaster = new DungeonMaster();

          return {
            log: [],
            gameOver: this.dungeonMaster.gameOver,
            playerAlive: this.dungeonMaster.player.health > 0,
            dungeonMap: this.dungeonMaster.dungeonKeeper.dungeon.map,
          };
        });
        break;
      default:
        break;
    }
    this.setState(() => ({
      log: this.dungeonMaster.log,
      gameOver: this.dungeonMaster.gameOver,
      playerAlive: this.dungeonMaster.player.health > 0,
      dungeonMap: this.dungeonMaster.dungeonKeeper.dungeon.map,
    }));
  };

  render() {
    let divStyle = {
      transform: `translate(-50%, -50%)`,
    };
    if (this.dungeonMaster.dungeonKeeper.dungeon.player) {
      const { x, y } = this.dungeonMaster.dungeonKeeper.dungeon.player.location;
      const compensateForUI = 10;
      divStyle = {
        transform: `translate(-${x + x + compensateForUI}%, -${y + y}%)`,
      };
    }

    if (this.state.gameOver) {
      return (
        <div className="message victory">
          <p>Victory Achieved</p>
          <small>press r to restart</small>
        </div>
      );
    } else if (!this.state.playerAlive) {
      return (
        <div className="message">
          <p>You Died</p>
          <small>press r to restart</small>
        </div>
      );
    }

    return [
      <div className="app" style={divStyle} key="map">
        <Map dungeonMap={this.state.dungeonMap} />
      </div>,
      <UI
        key="ui"
        log={this.state.log}
        health={this.dungeonMaster.player.health}
        strength={this.dungeonMaster.player.strength}
        level={this.dungeonMaster.player.level}
        experience={this.dungeonMaster.player.experience}
        levelThreshold={this.dungeonMaster.player.levelThreshold}
        zone={this.dungeonMaster.zone}
        weapon={this.dungeonMaster.player.weapon}
      />,
    ];
  }
}

export default Game;
