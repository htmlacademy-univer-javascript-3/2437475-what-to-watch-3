import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import { Film } from './mocks/films';
import { Detail } from './mocks/details';
import store from './store';
import { Provider } from 'react-redux';
import { getMoreInfoAboutFilm } from './components/functions/get-more-info-about-film';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

  //Пока нет авторизации, не могу получить промо-фильм. Беру первый (про Гриндевальда)

  let state = store.getState();
  let [detailPromoFilm, _] = await getMoreInfoAboutFilm(state.films[0]);
  let promoFilm = state.films[0];

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App paramsMain={{
        film: promoFilm as Film,
        detail: detailPromoFilm as Detail
      }}
      />
    </Provider>
  </React.StrictMode>
);

