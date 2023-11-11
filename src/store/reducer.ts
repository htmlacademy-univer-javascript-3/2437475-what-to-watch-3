import { changeGenre, setFilms } from "./action";
import { Film } from "../mocks/films";
import { createReducer } from '@reduxjs/toolkit';

type AppState = {
 genre: string;
 films: Film[];
};

const initialState: AppState = {
 genre: '',
 films: [],
};

export const appReducer = createReducer(initialState, (builder) => {
 builder
   .addCase(changeGenre, (state, action) => {
     state.genre = action.payload;
   })
   .addCase(setFilms, (state, action) => {
     state.films = action.payload;
   });
});
