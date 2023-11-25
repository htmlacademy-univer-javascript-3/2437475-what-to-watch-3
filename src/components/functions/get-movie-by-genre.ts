import { Film } from '../../mocks/films';

export function getMoviesByGenre (films: Film[], genre: string) {
  if (genre === 'All genres') {
    return films;
  }

  const filmsId = films.filter((film) => film.genre === genre).map((film) => film.id);

  return films.filter((film) => filmsId.includes(film.id));
}
