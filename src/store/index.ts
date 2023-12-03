import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { appReducer } from './reducer';
import { changeGenre, setFilms, setLoading } from './action';
import { Film } from '../mocks/films';
import { createAPI } from '../api';
import { getFilms } from './api-action';

export const preloadedState = {
  genre: 'All genres',
  films: [],
  details: [],
  overviews: [],
  filteredMovies: []
};

const api = createAPI();

const middleware = getDefaultMiddleware({
  thunk: {
    extraArgument: api,
  },
  serializableCheck: {
    ignoredActions: ['setDetails'],
  },
});

const store = configureStore({
  reducer: appReducer,
  middleware,
  preloadedState
});

export type AppDispatch = typeof store.dispatch;

store.dispatch(setLoading(true));

const loadingFilms = await store.dispatch(getFilms());
const films = loadingFilms.payload as Film[];

store.dispatch(setFilms(films));
store.dispatch(changeGenre('All genres'));

store.dispatch(setLoading(false));

export default store;
