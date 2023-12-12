import {Film} from '../mocks/films';
import {ReactNode, useCallback, useRef, useState} from 'react';
import {AppRoute} from './app';
import { Link } from 'react-router-dom';
import { VideoPlayer } from './video-player';

export const ONE_SECOND = 1000;

type PropsCard = {
  film: Film;
}

type filmsListProps = {
  films: Film[];
  children: ReactNode;
}

export function Card({film}: PropsCard) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => setIsHovered(true), ONE_SECOND);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(false);
  }, []);

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="small-film-card__image">
        {isHovered ? (
          <VideoPlayer src={film.video} muted width="280" height="175" poster={film.image} autoplay />
        ) : (
          <img src={film.image} alt={film.name} width="280" height="175" />
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.FilmPage}=${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export function Cards({ films, children }: filmsListProps) {
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <Card
          key={film.id}
          film={film}
        />
      ))}
      {children}
    </div>
  );
}


