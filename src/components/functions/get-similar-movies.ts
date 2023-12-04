import { SIMILAR_FILM_COUNT } from '../../constants';
import { Film } from '../../mocks/films';
import { getMoviesByGenre } from './get-movie-by-genre';

export type PropsSimilarMovies = {
    genre: string;
    filmId: string;
    films: Film[];
  }

export function getSimilarMovies({genre, filmId, films}: PropsSimilarMovies) {
  const similarFilms = getMoviesByGenre(films, genre).filter((film) => film.id !== filmId);

  if (similarFilms.length > SIMILAR_FILM_COUNT) {
    return similarFilms.slice(0, SIMILAR_FILM_COUNT);
  }

  return similarFilms;
}
