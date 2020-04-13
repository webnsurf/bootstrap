import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from 'store';
import { isDevelopment } from 'environment';

import { App } from './App';

const mod: any = module;

if (isDevelopment && mod.hot) {
  mod.hot.accept();
}

ReactDOM.render((
  <BrowserRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));
