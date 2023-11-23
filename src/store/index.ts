import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './reducer';
import { setDetails, setFilms } from './action';
import { Details } from '../mocks/details';
import { Films } from '../mocks/films';

export const preloadedState = {
  genre: 'All genres',
  films: Films,
  details: Details,
  filteredMovies: Films
};

const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['setDetails'],
      },
    }),
  preloadedState
});

store.dispatch(setFilms(Films));
store.dispatch(setDetails(Details));

export default store;
