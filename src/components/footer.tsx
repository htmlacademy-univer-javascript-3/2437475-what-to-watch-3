import React from 'react';
import { Logo } from './logo';

export const Footer = React.memo(() => (
  <footer className="page-footer">
    <Logo/>

    <div className="copyright">
      <p>© 2023 What to watch Ltd.</p>
    </div>
  </footer>
));

Footer.displayName = 'Footer';
