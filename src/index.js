// @flow
import React from 'react';
import ReactDOM from 'react-dom';

// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/es6/map';
import 'core-js/es6/set';

import './index.css';
import Game from './components/Game';
import DungeonMaster from './dungeon/DungeonMaster';
// import registerServiceWorker from './registerServiceWorker';

const dungeonMaster = new DungeonMaster();

ReactDOM.render(
  <Game dungeonMaster={dungeonMaster} />,
  document.getElementById('root'),
);
// registerServiceWorker();
