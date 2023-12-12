import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Film } from '../mocks/films';
import { getMoviesByGenre } from '../components/functions/get-movie-by-genre';
import { Detail } from '../mocks/details';
import { fetchFilms } from './api-action';

export type AppState = {
  authorizationStatus: boolean;
  loading: boolean;
  errorMessage: string;
  genre: string;
  films: Film[];
  details: Detail[];
  filteredMovies: Film[];
};

export const initialState: AppState = {
  authorizationStatus: false,
  loading: true,
  errorMessage: '',
  genre: 'All genres',
  films: [],
  details: [],
  filteredMovies: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeGenre(state, action: PayloadAction<string>) {
      state.genre = action.payload;
      if (state.films && state.details && state.genre) {
        const newFilteredMovies = getMoviesByGenre(state.films, state.genre);
        state.filteredMovies = newFilteredMovies;
      }
    },
    setFilms(state, action: PayloadAction<Film[]>) {
      state.films = action.payload;
    },
    setDetails(state, action: PayloadAction<Detail>) {
      state.loading = true;
      state.details = state.details.concat(action.payload);
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateAuthorizationStatus(state, action: PayloadAction<boolean>) {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilms.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchFilms.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { changeGenre, setFilms, setDetails, setLoading, updateAuthorizationStatus } =
  appSlice.actions;

export default appSlice.reducer;
