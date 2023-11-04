import {Film} from '../mocks/films';
import {ReactNode, useRef, useState} from 'react';
import {AppRoute} from './app';
import { Link } from 'react-router-dom';
import { VideoPlayer } from './video-player';
import { Details } from '../mocks/details';

const OneSecond = 1000;
const SimilarFilmConst = 4;

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

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => setIsHovered(true), OneSecond);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(false);
  };

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

export type PropsSimilarMovies = {
  genre: string;
  filmId: string;
  films: Film[];
}

export function getSimilarMovies({genre, filmId, films}: PropsSimilarMovies) {
  const similarFilms = films.filter((film) =>
    Details.find((detailInDetails) => detailInDetails.filmId === film.id)?.genre === genre && film.id !== filmId);

  if (similarFilms.length > SimilarFilmConst) {
    return similarFilms.slice(0, SimilarFilmConst);
  }

  return similarFilms;
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


