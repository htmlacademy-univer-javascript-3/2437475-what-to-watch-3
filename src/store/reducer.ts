import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Film } from '../mocks/films';
import { Detail } from '../mocks/details';
import { fetchFilms } from './api-action';

export const ALL_GENRES = 'All genres';

export type AppState = {
  authorizationStatus: boolean;
  loading: boolean;
  errorMessage: string;
  genre: string;
  films: Film[];
  details: Detail[];
  filteredMovies: Film[];
  myList: Film[];
};

export const initialState: AppState = {
  authorizationStatus: false,
  loading: true,
  errorMessage: '',
  genre: ALL_GENRES,
  films: [],
  details: [],
  filteredMovies: [],
  myList: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeGenre(state, action: PayloadAction<string>) {
      state.genre = action.payload;
    },
    setFilms(state, action: PayloadAction<Film[]>) {
      state.films = action.payload;
    },
    setDetail(state, action: PayloadAction<Detail>) {
      state.loading = true;
      state.details = state.details.concat(action.payload);
      state.loading = false;
    },
    setDetails(state, action: PayloadAction<Detail[]>) {
      state.loading = true;
      state.details = action.payload;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateAuthorizationStatus(state, action: PayloadAction<boolean>) {
      state.authorizationStatus = action.payload;
    },
    setFilmInMyList(state, action: PayloadAction<Film>) {
      state.myList = state.myList.concat(action.payload);
    },
    setMyList(state, action: PayloadAction<Film[]>) {
      state.myList = action.payload;
    }
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

export const { changeGenre, setFilms, setDetail, setDetails, setLoading, updateAuthorizationStatus, setFilmInMyList, setMyList } =
  appSlice.actions;

export default appSlice.reducer;
