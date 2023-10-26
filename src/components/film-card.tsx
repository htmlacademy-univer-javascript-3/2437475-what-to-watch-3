import {Film} from '../mocks/films';
import {MouseEventHandler, ReactNode, useState} from 'react';
import {AppRoute} from './app';
import { Link } from 'react-router-dom';

type propsCard = {
  film: Film;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}

type filmsListProps = {
  films: Film[];
  children: ReactNode;
}

export function Card({film}: propsCard) {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={film.image} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.FilmPage}=${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}


export function Cards({ films, children }: filmsListProps) {
  const [, setActiveFilm] = useState<Film | null>(null);
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <Card
          key={film.id}
          film={film}
          onMouseEnter={() => setActiveFilm(film)}
          onMouseLeave={() => setActiveFilm(null)}
        />
      ))}
      {children}
    </div>
  );
}


