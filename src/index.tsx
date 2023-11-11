import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import { Films } from './mocks/films';
import { Details } from './mocks/details';
import store from './store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App paramsMain={{
        film: Films[0],
        detail: Details[0]
      }}
      />
    </Provider>
  </React.StrictMode>
);
