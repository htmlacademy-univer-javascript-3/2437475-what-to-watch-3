import { Detail } from '../../mocks/details';
import { Film } from '../../mocks/films';

export function getMoviesByGenre (films: Film[], details: Detail[], genre: string) {
  if (genre === 'All genres') {
    return films;
  }

  const detailIds = details
    .filter((detail) => detail.genre === genre)
    .map((detail) => detail.filmId);

  return films.filter((film) => detailIds.includes(film.id));
}
