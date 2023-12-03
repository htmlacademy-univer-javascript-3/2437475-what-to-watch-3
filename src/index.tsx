import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import { Detail } from './mocks/details';
import store from './store';
import { Provider } from 'react-redux';
// import { getMoreInfoAboutFilm } from './components/functions/get-more-info-about-film';
import { fetchFilms, getFilm, getPromoFilm } from './store/api-action';
import { Film } from './mocks/films';
import { setFilms } from './store/action';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

await store.dispatch(fetchFilms());

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

