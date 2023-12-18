import { Film } from '../mocks/films';
import { ALL_GENRES } from '../store/reducer';

type GenreListProps = {
 films: Film[];
 activeGenre: string;
 onGenreChange: (genre: string) => void;
}

export function GenreList ({ films, activeGenre, onGenreChange }: GenreListProps) {
  const genres = Array.from(new Set(films.map((film) => film.genre)));
  genres.unshift(ALL_GENRES);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${genre === activeGenre ? 'catalog__genres-item--active' : ''}`}>
          <button className="catalog__genres-link" onClick={() => onGenreChange(genre)}>
            {genre}
          </button>
        </li>
      ))}
    </ul>
  );
}
