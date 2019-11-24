import React from 'react';
import { render } from 'react-dom';

import './style.css';

import { HashRouter, Route } from 'react-router-dom';

import App from './components/App';

render(
  <HashRouter>
    <Route component={App} />
  </HashRouter>,
  document.getElementById('root')
);
