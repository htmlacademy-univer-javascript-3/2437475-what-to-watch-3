import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import { Detail } from './mocks/details';
import store from './store';
import { Provider } from 'react-redux';
import { getMoreInfoAboutFilm } from './components/functions/get-more-info-about-film';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//Пока нет авторизации, не могу получить промо-фильм. Беру первый (про Гриндевальда)

const state = store.getState();
const [detailPromoFilm, ] = await getMoreInfoAboutFilm(state.films[0]);
const promoFilm = state.films[0];

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App paramsMain={{
        film: promoFilm ,
        detail: detailPromoFilm as Detail
      }}
      />
    </Provider>
  </React.StrictMode>
);

