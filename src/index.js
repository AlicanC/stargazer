// @flow

import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const reactRoot = document.getElementById('root');
if (!reactRoot) {
  throw new Error('React root element not found');
}

ReactDOM.render(<App />, reactRoot);
