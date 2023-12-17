import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import appReducer, { ALL_GENRES } from './reducer';
import { createAPI } from '../api';

export const preloadedState = {
  authorizationStatus: false,
  genre: ALL_GENRES,
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

export default store;
