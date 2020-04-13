import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { isDevelopment } from 'environment';

import { App } from './App';

const mod: any = module;

if (isDevelopment && mod.hot) {
  mod.hot.accept();
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
