import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import { Detail } from './mocks/details';
import store from './store';
import { Provider } from 'react-redux';
import { fetchFilms, getAuthStatus, getPromoFilm } from './store/api-action';
import { Film } from './mocks/films';
import { updateAuthorizationStatus } from './store/action';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const state = store.getState();

const statusLogin = await store.dispatch(getAuthStatus(state.token));
if (statusLogin.payload) {
  store.dispatch(updateAuthorizationStatus(true));
}

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

