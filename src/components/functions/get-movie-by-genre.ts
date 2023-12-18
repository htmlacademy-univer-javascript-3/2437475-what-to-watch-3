import { Film } from '../../mocks/films';
import { ALL_GENRES } from '../../store/reducer';

export function getMoviesByGenre (films: Film[], genre: string) {
  if (genre === ALL_GENRES) {
    return films;
  }

  const filmsId = films.filter((film) => film.genre === genre).map((film) => film.id);

  return films.filter((film) => filmsId.includes(film.id));
}
