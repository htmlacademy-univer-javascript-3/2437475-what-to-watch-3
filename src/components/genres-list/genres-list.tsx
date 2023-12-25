import React from 'react';
import { Film } from '../../types/films';
import { ALL_GENRES } from '../../store/reducer';

const MAX_GENRES_LIST = 9;

type GenreListProps = {
 films: Film[];
 activeGenre: string;
 onGenreChange: (genre: string) => void;
}

export const GenreList = React.memo(({ films, activeGenre, onGenreChange }: GenreListProps) => {
  const genres = Array.from(new Set(films.map((film) => film.genre))).slice(0, MAX_GENRES_LIST);
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
});

GenreList.displayName = 'GenreList';
