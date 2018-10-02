// @flow

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function LoadingView() {
  let icon = faSpinner;

  // EASTEREGG: Show a star sometimes
  if (Math.random() * 100 < 10) {
    icon = faStar;
  }

  return (
    <div className="text-center">
      <FontAwesomeIcon icon={icon} spin />
      <div className="mt-1 mb-1" />
      Loading...
    </div>
  );
}
