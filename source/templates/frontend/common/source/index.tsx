import React from 'react';
import ReactDOM from 'react-dom';

import { isDevelopment } from 'environment';

import { App } from './App';

const mod: any = module;

if (isDevelopment && mod.hot) {
  mod.hot.accept();
}

ReactDOM.render((
  <App />
), document.getElementById('root'));
