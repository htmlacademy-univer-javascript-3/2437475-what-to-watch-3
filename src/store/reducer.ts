import { changeGenre, setFilms, setDetails } from './action';
import { Film, Films } from '../mocks/films';
import { createReducer } from '@reduxjs/toolkit';
import { Detail, Details } from '../mocks/details';
import { getMoviesByGenre } from '../components/functions/get-movie-by-genre';

export type AppState = {
 genre: string;
 films: Film[];
 details: Detail[];
 filteredMovies: Film[];
};

export const initialState: AppState = {
  genre: 'All genres',
  films: Films,
  details: Details,
  filteredMovies: Films
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      if (state.films && state.details && state.genre) {
        const newFilteredMovies = getMoviesByGenre(state.films, state.details, state.genre);
        state.filteredMovies = newFilteredMovies;
      }
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setDetails, (state, action) => {
      state.details = action.payload;
    });
});
