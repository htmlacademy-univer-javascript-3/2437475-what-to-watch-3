import React, { useCallback, useState } from 'react';
import { Cards } from '../film-card';
import { Film} from '../../mocks/films';
import { Detail } from '../../mocks/details';
import { Footer } from '../footer';
import { GenreList } from '../genres-list';
import { useDispatch, useSelector } from 'react-redux';
import { changeGenre } from '../../store/action';
import Spinner from '../spinner';
import { Header } from '../header';
import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../store/reducer';

export const FILMS_PAGE_SIZE = 8;

export type PropsMain = {
    film: Film;
    detail: Detail;
}

export function Main({film, detail}: PropsMain) {

  const loading = useSelector((state: AppState) => state.loading);
  const films = useSelector((state: AppState) => state.films);

  const authStatus = useSelector((state: AppState) => state.authorizationStatus);
  const dispatch = useDispatch();
  const [activeGenre, setActiveGenre] = useState('All genres');
  const [visibleMovies, setVisibleMovies] = useState(FILMS_PAGE_SIZE);
  const filteredMoviesSelector = createSelector(
    (state: AppState) => state.films,
    () => activeGenre,
    (filmsForFilter, activeGenreForFilter) => activeGenreForFilter === 'All genres' ? filmsForFilter : filmsForFilter.filter((filmForFilter) => filmForFilter.genre === activeGenreForFilter)
  );

  const filteredMovies = useSelector(filteredMoviesSelector);
  const MemoGenreList = React.memo(GenreList);
  const MemoCards = React.memo(Cards);
  const MemoFooter = React.memo(Footer);
  const MemoSpinner = React.memo(Spinner);

  const handleGenreChange = useCallback((genre: string) => {
    setActiveGenre(genre);
    dispatch(changeGenre(genre));
    setVisibleMovies(FILMS_PAGE_SIZE);
  }, [dispatch]);

  const handleShowMore = useCallback(() => {
    setVisibleMovies((prev) => prev + FILMS_PAGE_SIZE);
  }, []);

  if (loading) {
    return <MemoSpinner/>;
  }

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={detail.bigImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header authStatus={authStatus} />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={film.image} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{detail.genre}</span>
                <span className="film-card__year">{detail.year}</span>
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

          <MemoGenreList films={films} activeGenre={activeGenre} onGenreChange={handleGenreChange}/>

          <MemoCards films={filteredMovies.slice(0, visibleMovies)}>
            {
              filteredMovies.length > visibleMovies &&
              <button className="catalog__button" type="button" onClick={handleShowMore}>Show more</button>
            }
          </MemoCards>
        </section>

        <MemoFooter/>
      </div>
    </React.Fragment>
  );
}

