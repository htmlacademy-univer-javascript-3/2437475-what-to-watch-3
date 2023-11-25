import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { appReducer } from './reducer';
import { changeGenre, setFilms, setLoading } from './action';
import { Film } from '../mocks/films';
import { createAPI, getFilms } from '../api';

interface serverFilmsItem { id: string; name: string; previewImage: string; previewVideoLink: string; genre: string }

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

const loadingFilms = await store.dispatch(getFilms());
const serverFilmsResponse: serverFilmsItem[] = await loadingFilms.payload as serverFilmsItem[];

const films: Film[] = serverFilmsResponse.map((item: serverFilmsItem) => ({
  id: item.id ,
  name: item.name ,
  image: item.previewImage ,
  video: item.previewVideoLink ,
  genre: item.genre
}));

store.dispatch(setFilms(films));
store.dispatch(changeGenre('All genres'));

store.dispatch(setLoading(false));

export default store;
