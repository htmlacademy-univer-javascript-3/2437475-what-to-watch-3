import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app';
import { Detail } from './mocks/details';
import store from './store';
import { Provider } from 'react-redux';
import { fetchFilms, getPromoFilm } from './store/api-actions/api-actions-films';
import { Film } from './mocks/films';
import { fetchMyList } from './store/api-actions/api-actions-favorite';
import { getAuthStatus } from './store/api-actions/api-actions-user';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

await store.dispatch(getAuthStatus(localStorage.getItem('token') as string));
await store.dispatch(fetchFilms());
const state = store.getState();
if (state.authorizationStatus) {
  await store.dispatch(fetchMyList());
}

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

