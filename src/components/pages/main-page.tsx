import React, { useState } from 'react';
import { Cards } from '../film-card';
import { Film} from '../../mocks/films';
import { Detail } from '../../mocks/details';
import { Footer } from '../footer';
import { GenreList } from '../genres-list';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { changeGenre } from '../../store/action';

export type PropsMain = {
    film: Film;
    detail: Detail;
}

const FILMS_PAGE_SIZE = 8;

export function Main({film, detail}: PropsMain) {
  const details = useSelector((state: AppState) => state.details);
  const filteredMovies = useSelector((state: AppState) => state.filteredMovies);
  // console.log(details);
  const dispatch = useDispatch();
  const [activeGenre, setActiveGenre] = useState('All genres');
  const [visibleMovies, setVisibleMovies] = useState(FILMS_PAGE_SIZE);

  const handleGenreChange = (genre: string) => {
    setActiveGenre(genre);
    dispatch(changeGenre(genre));
    setVisibleMovies(FILMS_PAGE_SIZE);
  };

  const handleShowMore = () => {
    setVisibleMovies((prev) => prev + FILMS_PAGE_SIZE);
  };

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={film.bigImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={film.image} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{detail.genre}</span>
                <span className="film-card__year">{detail.year.getFullYear()}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList details={details} activeGenre={activeGenre} onGenreChange={handleGenreChange}/>

          <Cards films={filteredMovies.slice(0, visibleMovies)}>
            {
              filteredMovies.length > visibleMovies &&
              <button className="catalog__button" type="button" onClick={handleShowMore}>Show more</button>
            }
          </Cards>
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}

