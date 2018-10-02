// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';

export default function LoginRequiredView() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h5>Please login to view this page.</h5>
      <Link to="/login">Login</Link>
    </div>
  );
}
