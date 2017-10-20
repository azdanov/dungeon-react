// @flow
import React from 'react';
import ReactDOM from 'react-dom';

// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/es6/map';
import 'core-js/es6/set';

import './index.css';
import Map from './Map';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Map />, document.getElementById('root'));
// registerServiceWorker();
