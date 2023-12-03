import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import { Detail } from './mocks/details';
import store from './store';
import { Provider } from 'react-redux';
// import { getMoreInfoAboutFilm } from './components/functions/get-more-info-about-film';
import { getFilm } from './store/api-action';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//Пока нет авторизации, не могу получить промо-фильм. Беру первый (про Гриндевальда)


const state = store.getState();

const loadingdetail = await store.dispatch(getFilm(state.films[0].id));

const detailPromoFilm = loadingdetail.payload as Detail;
const promoFilm = state.films[0];

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

