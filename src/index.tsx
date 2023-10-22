import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App paramsMain={{
      film: {
        name: 'The Grand Budapest Hotel',
        genre: 'Drama',
        date:  new Date('02.06.2014'),
        image: 'img/bg-the-grand-budapest-hotel.jpg'
      }
    }}
    />
  </React.StrictMode>
);
