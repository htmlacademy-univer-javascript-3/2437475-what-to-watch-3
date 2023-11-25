import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { appReducer } from './reducer';
import { changeGenre, setFilms, setLoading } from './action';
import { Film } from '../mocks/films';
import { createAPI, getFilms } from '../api';

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

store.dispatch(setLoading(true));

let serverFilmsResponse;
let loadingFilms = await store.dispatch(getFilms())
 serverFilmsResponse = loadingFilms.payload;

  const films: Film[] = await serverFilmsResponse.map((item: { id: any; name: any; previewImage: any; previewVideoLink: any; genre: any; }) => ({
    id: item.id as string,
    name: item.name,
    image: item.previewImage,
    video: item.previewVideoLink,
    bigImage: '',
    genre: item.genre
  }));

store.dispatch(setFilms(films));
store.dispatch(changeGenre('All genres'));

store.dispatch(setLoading(false));

export default store;
