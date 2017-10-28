// @flow

import React from 'react';
import './UI.css';

function pickIcon(id: number) {
  switch (id) {
    case 0:
      return (
        <li>
          Knife {' '}
          <span role="img" aria-label="knife">
            🔪
          </span>
        </li>
      );
    case 1:
      return (
        <li>
          Bomb {' '}
          <span role="img" aria-label="bomb">
            💣
          </span>
        </li>
      );
    case 2:
      return (
        <li>
          Telephone {' '}
          <span role="img" aria-label="telephone">
            📞
          </span>
        </li>
      );
    case 3:
      return (
        <li>
          Flashlight {' '}
          <span role="img" aria-label="flashlight">
            🔦
          </span>
        </li>
      );
    case 4:
      return (
        <li>
          Newspaper {' '}
          <span role="img" aria-label="newspaper">
            🗞️
          </span>
        </li>
      );
    case 5:
      return (
        <li>
          Pen {' '}
          <span role="img" aria-label="pen">
            🖊️
          </span>
        </li>
      );
    case 6:
      return (
        <li>
          Scissors {' '}
          <span role="img" aria-label="scissors">
            ✂️
          </span>
        </li>
      );
    case 7:
      return (
        <li>
          Pick {' '}
          <span role="img" aria-label="pick">
            ⛏️
          </span>
        </li>
      );
    case 8:
      return (
        <li>
          Dagger {' '}
          <span role="img" aria-label="dagger">
            🗡️
          </span>
        </li>
      );
    case 9:
      return (
        <li>
          Wrench {' '}
          <span role="img" aria-label="wrench">
            🔧
          </span>
        </li>
      );
    case 10:
      return (
        <li>
          Hammer {' '}
          <span role="img" aria-label="hammer">
            🔨
          </span>
        </li>
      );
    default:
      return '';
  }
}

const UI = (props: {
  log: Array<string>,
  health: number,
  strength: number,
  level: number,
  experience: number,
  levelThreshold: number,
  zone: number,
  weapon: { id: number, power: number },
}) => (
  <div className="ui">
    <div className="box stats">
      <ul>
        <li>
          <span role="img" aria-label="red heart">
            ❤️
          </span>{' '}
          Health: {props.health}
        </li>
        <li>
          <span role="img" aria-label="curled biceps">
            💪
          </span>{' '}
          Strength: {props.strength}
        </li>
        <li>
          <span role="img" aria-label="level arrow">
            🔺
          </span>{' '}
          Level: {props.level}
          <progress value={props.experience} max={props.levelThreshold}>
            {props.experience} %
          </progress>
        </li>
        <li>
          <span role="img" aria-label="zone symbol">
            🔹
          </span>{' '}
          Zone: {props.zone}
        </li>
      </ul>
      <ul>
        <li className="inventory">
          <span role="img" aria-label="backpack">
            🎒
          </span>{' '}
          Inventory:{' '}
          <ul className="weapon">
            {pickIcon(props.weapon.id)}
            <li>Damage: {props.weapon.power}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div className="box">
      <ul className="log">
        <li>{props.log[props.log.length - 1]}</li>
        <li>{props.log[props.log.length - 2]}</li>
        <li>{props.log[props.log.length - 3]}</li>
        <li>{props.log[props.log.length - 4]}</li>
      </ul>
    </div>
  </div>
);

export default UI;
