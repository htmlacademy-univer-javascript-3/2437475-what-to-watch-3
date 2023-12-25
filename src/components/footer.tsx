import React from 'react';
import { Logo } from './logo';

export const Footer = React.memo(() => {
  return (
    <footer className="page-footer">
      <Logo/>

      <div className="copyright">
        <p>© 2023 What to watch Ltd.</p>
      </div>
    </footer>
  );
});
