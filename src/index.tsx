import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import { Detail } from './mocks/details';
import store from './store';
import { Provider } from 'react-redux';
import { fetchFilms, getAuthStatus, getPromoFilm } from './store/api-action';
import { Film } from './mocks/films';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

await store.dispatch(getAuthStatus(localStorage.getItem('token') as string));
await store.dispatch(fetchFilms());
console.log(store.getState().films);

const serverPromo = await store.dispatch(getPromoFilm());
const promo = serverPromo.payload as [Film, Detail];

const detailPromoFilm = promo[1];
const promoFilm = promo[0];

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App paramsMain={{
        film: promoFilm ,
        detail: detailPromoFilm
      }}
      />
    </Provider>
  </React.StrictMode>
);

