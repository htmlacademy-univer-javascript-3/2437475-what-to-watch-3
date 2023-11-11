import { Details } from '../../mocks/details';
import { Film } from '../../mocks/films';

const SIMILAR_FILM_COUNT = 4;

export type PropsSimilarMovies = {
    genre: string;
    filmId: string;
    films: Film[];
  }

export function getSimilarMovies({genre, filmId, films}: PropsSimilarMovies) {
  const similarFilms = films.filter((film) =>
    Details.find((detailInDetails) => detailInDetails.filmId === film.id)?.genre === genre && film.id !== filmId);

  if (similarFilms.length > SIMILAR_FILM_COUNT) {
    return similarFilms.slice(0, SIMILAR_FILM_COUNT);
  }

  return similarFilms;
}
