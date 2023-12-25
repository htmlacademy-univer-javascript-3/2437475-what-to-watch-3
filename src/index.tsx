import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app';
import { Detail } from './types/details';
import store from './store';
import { Provider } from 'react-redux';
import { fetchFilms, getPromoFilm } from './store/api-actions/api-actions-films';
import { Film } from './types/films';
import { fetchMyList } from './store/api-actions/api-actions-favorite';
import { getAuthStatus } from './store/api-actions/api-actions-user';
import Spinner from './components/spinner/spinner';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const AppContainer = () => {
  const [loading, setLoading] = useState(true);
  const [promoFilm, setPromoFilm] = useState<Film | null>(null);
  const [detailPromoFilm, setDetailPromoFilm] = useState<Detail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await store.dispatch(getAuthStatus(localStorage.getItem('token') as string));
      await store.dispatch(fetchFilms());
      const state = store.getState();
      if (state.authorizationStatus) {
        await store.dispatch(fetchMyList());
      }
      const serverPromo = await store.dispatch(getPromoFilm());
      const promo = serverPromo.payload as [Film, Detail];
      const newDetailPromoFilm = promo[1];
      const newPromoFilm = promo[0];

      setDetailPromoFilm(newDetailPromoFilm);
      setPromoFilm(newPromoFilm);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <React.StrictMode>
      <Provider store={store}>
        <App paramsMain={{ film: promoFilm as Film, detail: detailPromoFilm as Detail}} />
      </Provider>
    </React.StrictMode>
  );
};

root.render(<AppContainer />);
