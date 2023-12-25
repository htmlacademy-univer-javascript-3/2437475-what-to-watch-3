import React from 'react';
import './spinner.css';

const Spinner = React.memo(() => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
));

Spinner.displayName = 'Spinner';

export default Spinner;
