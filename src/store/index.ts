import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { appReducer } from './reducer';
import { createAPI } from '../api';

export const preloadedState = {
  token: '',
  authorizationStatus: false,
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

export default store;
