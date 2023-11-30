import { changeGenre, setFilms, setDetails, setLoading, setOverviews } from './action';
import { Film } from '../mocks/films';
import { createReducer } from '@reduxjs/toolkit';
import { getMoviesByGenre } from '../components/functions/get-movie-by-genre';
import { Detail } from '../mocks/details';
import { Overview } from '../mocks/overview';

export type AppState = {
 loading: boolean;
 errorMessage: string;
 genre: string;
 films: Film[];
 details: Detail[];
 overviews: Overview[];
 filteredMovies: Film[];
};

export const initialState: AppState = {
  loading: true,
  errorMessage: '',
  genre: 'All genres',
  films: [],
  details: [],
  overviews: [],
  filteredMovies: []
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      if (state.films && state.details && state.genre) {
        const newFilteredMovies = getMoviesByGenre(state.films, state.genre);
        state.filteredMovies = newFilteredMovies;
      }
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setDetails, (state, action) => {
      state.details = action.payload;
    })
    .addCase(setOverviews, (state, action) => {
      state.overviews = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload;
    });
  // .addCase(setErrorMessage, (state, action) => {
  //   state.errorMessage = action.payload;
  // });
});
