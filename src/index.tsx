import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import { Films } from './mocks/films';
import { Details } from './mocks/details';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App paramsMain={{
      film: Films[0],
      detail: Details[0]
    }}
    />
  </React.StrictMode>
);
