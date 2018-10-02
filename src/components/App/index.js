// @flow

import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomePage from '../HomePage';
import LoginPage from '../LoginPage';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <hr />
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  );
}
