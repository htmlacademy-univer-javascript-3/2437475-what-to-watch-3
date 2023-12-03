import { changeGenre, setFilms, setDetails, setLoading } from './action';
import { Film } from '../mocks/films';
import { createReducer } from '@reduxjs/toolkit';
import { getMoviesByGenre } from '../components/functions/get-movie-by-genre';
import { Detail } from '../mocks/details';
import { fetchFilms } from './api-action';

export type AppState = {
 loading: boolean;
 errorMessage: string;
 genre: string;
 films: Film[];
 details: Detail[];
 filteredMovies: Film[];
};

export const initialState: AppState = {
  loading: true,
  errorMessage: '',
  genre: 'All genres',
  films: [],
  details: [],
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
      state.loading = true;
      state.details = state.details.concat(action.payload);
      state.loading = false;
    })
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(fetchFilms.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchFilms.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchFilms.rejected, (state) => {
      state.loading = false;
    });
  // .addCase(setErrorMessage, (state, action) => {
  //   state.errorMessage = action.payload;
  // });
});
